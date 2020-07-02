import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {City} from '../../interfaces/City';
import {EndroitService} from '../../services/endroit.service';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';

export interface CheckGroupType {
  hebergements: boolean;
  restaurants: boolean;
  shoppings: boolean;
  cultures: boolean;
  loisirs: boolean;
  events: boolean;
  infos: boolean
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  private subject = new Subject<void>();


  public readonly mapOptions: google.maps.MapOptions = {
    fullscreenControl: false,
    styles: [
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'administrative.neighborhood',
        stylers: [{visibility: 'off'}]
      }
    ]
  };
  center: google.maps.LatLngLiteral = {lat: 30, lng: -10};
  zoom = 6;

  public selectedItem: any = null;

  public currentZoom = this.zoom;
  public cities: City[] = [];
  public city_id: number = null;

  public hebergements: any[] = [];
  public restaurants: any[] = [];
  public shoppings: any[] = [];
  public cultures: any[] = [];
  public loisirs: any[] = [];
  public events: any[] = [];
  public infos: any[] = [];

  public checkGroup: CheckGroupType = {
    hebergements: true,
    restaurants: true,
    shoppings: true,
    cultures: true,
    loisirs: true,
    events: true,
    infos: true,
  };

  constructor(private endroitService: EndroitService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loadCities();
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

  public getMapData(): void {
    this.ngxSpinner.show();
    this.endroitService.getEndroitsByCity(this.city_id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {
          this.ngxSpinner.hide();
          console.log(value);
          this.hebergements = value[0]['data'];
          this.restaurants = value[1]['data'];
          this.shoppings = value[2]['data'];
          this.cultures = value[3]['data'];
          this.loisirs = value[4]['data'];
          this.events = value[5]['data'];
          this.infos = value[6]['data'];

          this.setCenterMap();
          this.zoom = 18;
          this.currentZoom = this.zoom;
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.alert({
            title: 'Données',
            text: error.message,
            icon: 'error'
          });
        }
      );
  }

  public getMarkerOption(iconUrl: string, isVisible: boolean = true): google.maps.MarkerOptions {
    let icon: google.maps.Icon = {
      url: iconUrl,
      scaledSize: new google.maps.Size(50, 50),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };

    return {
      icon: icon,
      opacity: 0.9,
      visible: (isVisible && this.currentZoom >= 14)
    };
  }

  private loadCities(): void {
    this.ngxSpinner.show();
    this.endroitService.getCities()
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {
          this.ngxSpinner.hide();
          this.cities = value['data'];
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.alert({
            title: 'Données',
            text: error.message,
            icon: 'error'
          });
        }
      );
  }

  private setCenterMap(): void {
    if (this.hebergements.length > 0) {
      this.center = {lng: this.hebergements[0].longitude, lat: this.hebergements[0].latitude};
    } else if (this.restaurants.length > 0) {
      this.center = {lng: this.restaurants[0].longitude, lat: this.restaurants[0].latitude};
    } else if (this.loisirs.length > 0) {
      this.center = {lng: this.loisirs[0].longitude, lat: this.loisirs[0].latitude};
    } else if (this.events.length > 0) {
      this.center = {lng: this.events[0].longitude, lat: this.events[0].latitude};
    } else if (this.cultures.length > 0) {
      this.center = {lng: this.cultures[0].longitude, lat: this.cultures[0].latitude};
    } else if (this.infos.length > 0) {
      this.center = {lng: this.infos[0].longitude, lat: this.infos[0].latitude};
    } else if (this.shoppings.length > 0) {
      this.center = {lng: this.shoppings[0].longitude, lat: this.shoppings[0].latitude};
    }
  }


  public getZoom(map: GoogleMap): void {

    this.currentZoom = map.getZoom();
    if (this.currentZoom < 14) {
      this.infoWindow.close();
    }
  }

  public openInfoWindow(marker: MapMarker, item: any) {

    this.selectedItem = item;
    this.infoWindow.open(marker);
  }
}
