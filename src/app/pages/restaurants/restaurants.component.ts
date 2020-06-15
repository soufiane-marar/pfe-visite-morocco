import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subject} from 'rxjs';
import {City} from '../../interfaces/City';
import {Categorie} from '../../interfaces/Categorie';
import {EndroitService} from '../../services/endroit.service';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material/dialog';
import {take, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {RestaurantService} from '../../services/restaurant.service';
import {RestauDialogComponent} from './restau-dialog/restau-dialog.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['logo', 'reference', 'name', 'specialite', 'city', 'actions'];

  public restaurants: any[] = [];
  public cities: City[] = [];
  public categories: Categorie[] = [];


  public restaurantsSource: any;

  constructor(public endroitService: EndroitService,
              private restaurantService: RestaurantService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    forkJoin([this.endroitService.getCities(), this.endroitService.getCategories(), this.restaurantService.getRestaurants()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {
          console.log(value);

          this.ngxSpinner.hide();
          this.cities = value[0];
          this.categories = value[1];
          this.restaurants = value[2];
          this.restaurantsSource = new MatTableDataSource<any>(this.restaurants);
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

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

  public addRestaurant(): void {
    this.openDialog(true);
  }

  public editRestaurant(element: any): void {
    this.openDialog(false, element);
  }

  public deleteRestaurant(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer l\'Restaurants ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.restaurantService.deleteRestaurant(element.id)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.restaurants = this.endroitService.removeFromArray<any>(element, this.restaurants);
                this.restaurantsSource = new MatTableDataSource<any>(this.restaurants);

                this.alertBoxService.alert({
                  title: 'Suppression',
                  text: 'Opération terminé avec succé',
                  icon: 'success'
                });
              },
              error => {
                this.ngxSpinner.hide();
                console.log(error);

                this.alertBoxService.alert({
                  title: 'Suppression',
                  text: error.message,
                  icon: 'error'
                });
              }
            );
        }
      });
  }

  private openDialog(isnew: boolean, restaurant: any = null): void {
    const dialogRef = this.dialog.open(RestauDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, restaurant: restaurant, cities: this.cities, categories: this.categories}
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          if (isnew) {
            this.restaurants.push(result);
            this.restaurantsSource = new MatTableDataSource<any>(this.restaurants);
          } else {
            let index = this.restaurants.indexOf(restaurant);

            if (index !== -1) {
              this.restaurants[index] = result;
            }

            this.restaurantsSource = new MatTableDataSource<any>(this.restaurants);
          }
        }
      });
  }
}
