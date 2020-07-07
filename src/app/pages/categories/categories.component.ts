import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Categorie} from '../../interfaces/Categorie';
import {EndroitService} from '../../services/endroit.service';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material/dialog';
import {take, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {CategoriesService} from '../../services/categories.service';
import {CategoriesDialogComponent} from './categories-dialog/categories-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: any;

  public categories: Categorie[] = [];

  constructor(public categoriesService: CategoriesService,
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
    this.categoriesService.getCategories()
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.categories = value['data'];
          this.dataSource = new MatTableDataSource<any>(this.categories);
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

  public addCategorie(): void {
    this.openDialog(true);
  }

  public editCategorie(element: any): void {
    this.openDialog(false, element);
  }

  public deleteCategorie(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer la catégorie ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.categoriesService.deleteCategorie(element.id)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.categories = this.endroitService.removeFromArray<any>(element, this.categories);
                this.dataSource = new MatTableDataSource<any>(this.categories);

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

  private openDialog(isnew: boolean, categorie: any = null): void {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, categorie: categorie}
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          if (isnew) {
            this.initData();
          } else {
            let index = this.categories.indexOf(categorie);

            if (index !== -1) {
              this.categories[index].name = result.name;
            }

            this.dataSource = new MatTableDataSource<any>(this.categories);
          }
        }
      });
  }
}
