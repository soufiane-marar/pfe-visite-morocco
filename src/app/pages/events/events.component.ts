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
import {EventsService} from '../../services/events.service';
import {EventsDialogComponent} from './events-dialog/events-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  private subject = new Subject<void>();

  public displayedColumns: string[] = ['logo', 'reference', 'name', 'type', 'city', 'actions'];
  public eventsSource: any;

  public events: any[] = [];
  public cities: City[] = [];
  public categories: Categorie[] = [];

  constructor(public endroitService: EndroitService,
              private eventsService: EventsService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();
  }

  public initData(): void {
    this.ngxSpinner.show();
    forkJoin([this.endroitService.getCities(), this.endroitService.getCategories(), this.eventsService.getEvents()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.cities = value[0]['data'];
          this.categories = value[1]['data'];
          this.events = value[2]['data'];
          this.eventsSource = new MatTableDataSource<any>(this.events);
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

  public addEvents(): void {
    this.openDialog(true);
  }

  public editEvent(element: any): void {
    this.openDialog(false, element);
  }

  public deleteEvent(element: any): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer l\'évenement ' + element.name + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.eventsService.deleteEvent(element.reference)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.events = this.endroitService.removeFromArray<any>(element, this.events);
                this.eventsSource = new MatTableDataSource<any>(this.events);

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

  private openDialog(isnew: boolean, event: any = null): void {
    const dialogRef = this.dialog.open(EventsDialogComponent, {
      disableClose: !isnew,
      data: {isnew: isnew, event: event, cities: this.cities, categories: this.categories}
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
