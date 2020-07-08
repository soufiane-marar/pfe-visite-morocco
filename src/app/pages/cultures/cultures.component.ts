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
import {CulturesService} from '../../services/cultures.service';
import {CulturesDialogComponent} from './cultures-dialog/cultures-dialog.component';
import {AuthService} from '../../services/login/auth.service';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.css']
})
export class CulturesComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['logo', 'reference', 'name', 'type', 'city', 'actions'];
  public culturesSource: any;

  public cultures: any[] = [];
  public cities: City[] = [];
  public categories: Categorie[] = [];

  constructor(public endroitService: EndroitService,
              public authService: AuthService,
              private culturesService: CulturesService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    forkJoin([this.endroitService.getCities(), this.endroitService.getCategories(), this.culturesService.getCultures()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.cities = value[0]['data'];
          this.categories = value[1]['data'];
          this.cultures = value[2]['data'];
          this.culturesSource = new MatTableDataSource<any>(this.cultures);
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

  public addCultures(): void {
    this.openDialog(true);
  }

  public editCulture(element: any): void {
    this.openDialog(false, element);
  }

  public deleteCulture(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer culture ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.culturesService.deleteCulture(element.reference)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.cultures = this.endroitService.removeFromArray<any>(element, this.cultures);
                this.culturesSource = new MatTableDataSource<any>(this.cultures);

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

  private openDialog(isnew: boolean, culture: any = null): void {
    const dialogRef = this.dialog.open(CulturesDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, culture: culture, cities: this.cities, categories: this.categories}
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
