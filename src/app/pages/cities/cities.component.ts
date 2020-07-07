import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {City} from '../../interfaces/City';
import {EndroitService} from '../../services/endroit.service';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material/dialog';
import {CitiesService} from '../../services/cities.service';
import {take, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {CitiesDialogComponent} from './cities-dialog/cities-dialog.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: any;

  public cities: City[] = [];

  constructor(public citiesService: CitiesService,
              public endroitService: EndroitService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    this.citiesService.getCities()
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.cities = value['data'];
          this.dataSource = new MatTableDataSource<any>(this.cities);
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

  public addCity(): void {
    this.openDialog(true);
  }

  public editCity(element: any): void {
    this.openDialog(false, element);
  }

  public deleteCity(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer la ville ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.citiesService.deleteCity(element.id)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.cities = this.endroitService.removeFromArray<any>(element, this.cities);
                this.dataSource = new MatTableDataSource<any>(this.cities);

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

  private openDialog(isnew: boolean, city: any = null): void {
    const dialogRef = this.dialog.open(CitiesDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, city: city}
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          if (isnew) {
            this.initData();
          } else {
            let index = this.cities.indexOf(city);

            if (index !== -1) {
              this.cities[index].name = result.name;
            }

            this.dataSource = new MatTableDataSource<any>(this.cities);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
