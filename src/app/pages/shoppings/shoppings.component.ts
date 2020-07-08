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
import {ShoppingsService} from '../../services/shoppings.service';
import {ShoppingsDialogComponent} from './shoppings-dialog/shoppings-dialog.component';
import {AuthService} from '../../services/login/auth.service';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.component.html',
  styleUrls: ['./shoppings.component.css']
})
export class ShoppingsComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['logo', 'reference', 'name', 'type', 'city', 'actions'];
  public shoppingsSource: any;

  public shoppings: any[] = [];
  public cities: City[] = [];
  public categories: Categorie[] = [];

  constructor(public endroitService: EndroitService,
              public authService: AuthService,
              private shoppingsService: ShoppingsService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    forkJoin([this.endroitService.getCities(), this.endroitService.getCategories(), this.shoppingsService.getShoppings()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.cities = value[0]['data'];
          this.categories = value[1]['data'];
          this.shoppings = value[2]['data'];
          this.shoppingsSource = new MatTableDataSource<any>(this.shoppings);
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

  public addShoppings(): void {
    this.openDialog(true);
  }

  public editShopping(element: any): void {
    this.openDialog(false, element);
  }

  public deleteShopping(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer le shopping ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.shoppingsService.deleteShopping(element.reference)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.shoppings = this.endroitService.removeFromArray<any>(element, this.shoppings);
                this.shoppingsSource = new MatTableDataSource<any>(this.shoppings);

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

  private openDialog(isnew: boolean, shopping: any = null): void {
    const dialogRef = this.dialog.open(ShoppingsDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, shopping: shopping, cities: this.cities, categories: this.categories}
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          this.initData();
        }
      });
  }
}
