import {Component, OnDestroy, OnInit} from '@angular/core';
import {City} from '../../interfaces/City';
import {Categorie} from '../../interfaces/Categorie';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material/dialog';
import {EndroitService} from '../../services/endroit.service';
import {HebergementsService} from '../../services/hebergements.service';
import {forkJoin, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {HebergementDialogComponent} from './hebergement-dialog/hebergement-dialog.component';

@Component({
  selector: 'app-hebergements',
  templateUrl: './hebergements.component.html',
  styleUrls: ['./hebergements.component.css']
})
export class HebergementsComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['logo', 'reference', 'name', 'type', 'city', 'actions'];
  public hebergementsSource: any;

  public hebergements: any[] = [];
  public cities: City[] = [];
  public categories: Categorie[] = [];

  constructor(public endroitService: EndroitService,
              private hebergementsService: HebergementsService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    forkJoin([this.endroitService.getCities(), this.endroitService.getCategories(), this.hebergementsService.getHebergements()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.cities = value[0];
          this.categories = value[1];
          this.hebergements = value[2];
          this.hebergementsSource = new MatTableDataSource<any>(this.hebergements);
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

  public addHebergements(): void {
    this.openDialog(true);
  }

  public editHebergement(element: any): void {
    this.openDialog(false, element);
  }

  public deleteHebergement(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer l\'hebergements ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.hebergementsService.deleteHebergement(element.id)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.hebergements = this.endroitService.removeFromArray<any>(element, this.hebergements);
                this.hebergementsSource = new MatTableDataSource<any>(this.hebergements);

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

  private openDialog(isnew: boolean, hebergement: any = null): void {
    const dialogRef = this.dialog.open(HebergementDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, hebergement: hebergement, cities: this.cities, categories: this.categories}
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          if (isnew) {
            this.hebergements.push(result);
            this.hebergementsSource = new MatTableDataSource<any>(this.hebergements);
          } else {
            let index = this.hebergements.indexOf(hebergement);

            if (index !== -1) {
              this.hebergements[index] = result;
            }

            this.hebergementsSource = new MatTableDataSource<any>(this.hebergements);
          }
        }
      });
  }
}
