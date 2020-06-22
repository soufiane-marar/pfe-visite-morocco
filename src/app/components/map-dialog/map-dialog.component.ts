import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {

  mapOptions: google.maps.MapOptions = {fullscreenControl:false};
  center = {lat: 30, lng: -10};
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 6;
  display?: google.maps.LatLngLiteral;

  constructor(public dialogRef: MatDialogRef<MapDialogComponent>,) {
  }

  ngOnInit(): void {
  }

  public setPosition(event: google.maps.MouseEvent): void {
    if (this.markerPositions.length > 0) {
      this.markerPositions.pop();
    }
    this.markerPositions.push(event.latLng.toJSON());

  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  public close(): void {
    this.dialogRef.close();
  }
}
