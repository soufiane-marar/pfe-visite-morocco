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
import {LoisirService} from '../../services/loisir.service';
import {LoisirDialogComponent} from './loisir-dialog/loisir-dialog.component';

@Component({
  selector: 'app-loisir',
  templateUrl: './loisir.component.html',
  styleUrls: ['./loisir.component.css']
})
export class LoisirComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['logo', 'reference', 'name', 'type', 'city', 'actions'];
  public loisirsSource: any;

  public loisirs: any[] = [];
  public cities: City[] = [];
  public categories: Categorie[] = [];

  constructor(public endroitService: EndroitService,
              private loisirService: LoisirService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    forkJoin([this.endroitService.getCities(), this.endroitService.getCategories(), this.loisirService.getLoisirs()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.cities = value[0];
          this.categories = value[1];
          this.loisirs = value[2];
          this.loisirsSource = new MatTableDataSource<any>(this.loisirs);
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

  public addLoisirs(): void {
    this.openDialog(true);
  }

  public editLoisir(element: any): void {
    this.openDialog(false, element);
  }

  public deleteLoisir(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer loisir ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.loisirService.deleteLoisir(element.id)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.loisirs = this.endroitService.removeFromArray<any>(element, this.loisirs);
                this.loisirsSource = new MatTableDataSource<any>(this.loisirs);

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

  private openDialog(isnew: boolean, loisir: any = null): void {
    const dialogRef = this.dialog.open(LoisirDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, loisir: loisir, cities: this.cities, categories: this.categories}
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          if (isnew) {
            this.loisirs.push(result);
            this.loisirsSource = new MatTableDataSource<any>(this.loisirs);
          } else {
            let index = this.loisirs.indexOf(loisir);

            if (index !== -1) {
              this.loisirs[index] = result;
            }

            this.loisirsSource = new MatTableDataSource<any>(this.loisirs);
          }
        }
      });
  }
}
