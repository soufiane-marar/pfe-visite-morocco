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
import {InfoService} from '../../services/info.service';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {AuthService} from '../../services/login/auth.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = [ 'reference', 'name', 'type', 'city', 'actions'];
  public infosSource: any;

  public infos: any[] = [];
  public cities: City[] = [];
  public categories: Categorie[] = [];

  constructor(public endroitService: EndroitService,
              public authService: AuthService,
              private infoService: InfoService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    forkJoin([this.endroitService.getCities(), this.endroitService.getCategories(), this.infoService.getInfos()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.cities = value[0]['data'];
          this.categories = value[1]['data'];
          this.infos = value[2]['data'];
          this.infosSource = new MatTableDataSource<any>(this.infos);
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.error(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

  public addInfos(): void {
    this.openDialog(true);
  }

  public editInfo(element: any): void {
    this.openDialog(false, element);
  }

  public deleteInfo(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer l\'infos ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.infoService.deleteInfo(element.reference)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.infos = this.endroitService.removeFromArray<any>(element, this.infos);
                this.infosSource = new MatTableDataSource<any>(this.infos);

                this.alertBoxService.alert({
                  title: 'Suppression',
                  text: 'Opération terminé avec succé',
                  icon: 'success'
                });
              },
              error => {
                this.ngxSpinner.hide();
                console.log(error);

                this.alertBoxService.error(error);
              }
            );
        }
      });
  }

  private openDialog(isnew: boolean, info: any = null): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, info: info, cities: this.cities, categories: this.categories}
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
