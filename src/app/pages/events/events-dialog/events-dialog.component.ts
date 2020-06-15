import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageService} from '../../../utils/error-message.service';
import {AlertBoxService} from '../../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CustomValidators} from '../../../validators/custom.validator';
import {MapDialogComponent} from '../../../components/map-dialog/map-dialog.component';
import {take} from 'rxjs/operators';
import {EventsService} from '../../../services/events.service';

import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {frLocale} from 'ngx-bootstrap/locale';

defineLocale('fr', frLocale);

@Component({
  selector: 'app-events-dialog',
  templateUrl: './events-dialog.component.html',
  styleUrls: ['./events-dialog.component.css']
})
export class EventsDialogComponent implements OnInit {
  public formGrp: FormGroup;

  public media: { path: any }[] = [];

  constructor(private formBuilder: FormBuilder,
              public frErrSrv: ErrorMessageService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              private eventsService: EventsService,
              public dialog: MatDialog,
              private localeService: BsLocaleService,
              public dialogRef: MatDialogRef<EventsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    this.localeService.use('fr');
    let hbg: any = this.data.event;

    this.media = hbg ? hbg.media : [];

    this.formGrp = this.formBuilder.group(
      {
        name: new FormControl(hbg ? hbg.name : null, [Validators.required, Validators.minLength(4)]),
        reference: new FormControl(hbg ? hbg.reference : null),
        description: new FormControl(hbg ? hbg.description : null, [Validators.minLength(15)]),
        adresse1: new FormControl(hbg ? hbg.adresse1 : null, [Validators.required]),
        adresse2: new FormControl(hbg ? hbg.adresse2 : null),

        startDate: new FormControl(hbg ? hbg.startDate : null, [Validators.required]),
        endDate: new FormControl(hbg ? hbg.endDate : null, [Validators.required]),
       /* startTime: new FormControl(hbg ? hbg.startTime : null, [Validators.required]),
        endTime: new FormControl(hbg ? hbg.endTime : null, [Validators.required]),*/

        email: new FormControl(hbg ? hbg.email : null, [Validators.email]),
        telephone: new FormControl(hbg ? hbg.telephone : null, [Validators.minLength(10)]),
        website: new FormControl(hbg ? hbg.website : null),
        zipcode: new FormControl(hbg ? hbg.zipcode : null),
        city_id: new FormControl(hbg ? hbg.city_id : null, [Validators.required]),
        logo: new FormControl(hbg ? hbg.logo : null),
        categorie_id: new FormControl(hbg ? hbg.categorie_id : null, [Validators.required]),
        longitude: new FormControl(hbg ? hbg.longitude : null, [Validators.required]),
        latitude: new FormControl(hbg ? hbg.latitude : null, [Validators.required]),
        type: new FormControl(hbg ? hbg.type : null, [Validators.required]),
        media: new FormControl(hbg ? hbg.media.length + ' images' : null, [Validators.required]),
      },
      {validators: [CustomValidators.CheckLatitude, CustomValidators.CheckLongitude]}
    );
  }


  public close(): void {
    this.dialogRef.close();
  }

  public confirm(): void {

    if (this.formGrp.invalid) {
      return;
    }

    if (this.media.length == 0) {
      this.alertBoxService.alert({icon: 'warning', text: 'Veuillez ajouter ou moins une image !'});
      return;
    }

    if (this.data.isnew) {
      this.add();
    } else {
      this.edit();
    }
  }

  public openMapDialog(): void {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: '50%',
      disableClose: true,
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        console.log('map coords: ', result);
        if (result) {
          this.formGrp.controls['longitude'].setValue(result.lng);
          this.formGrp.controls['latitude'].setValue(result.lat);
        }
      });
  }

  private getBase64Url(file: File): Promise<string | ArrayBuffer> {

    return new Promise(function (resolve, reject) {
      let reader = new FileReader();
      reader.onloadend = function (e) {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  public selectLogo(event: any): void {
    this.getBase64Url(event.target.files[0])
      .then(result => {
        if (result) {
          this.formGrp.controls['logo'].setValue(result);
          this.formGrp.controls['logo'].setErrors(null);
        } else {
          this.formGrp.controls['logo'].setValue(null);
          this.formGrp.controls['logo'].setErrors({required: true});
        }
      });
  }

  public fileChange(event: any): void {

    for (let i = 0; i < event.target.files.length; i++) {
      this.getBase64Url(event.target.files[i])
        .then(result => {
          this.media.push({path: result});
          if (i == event.target.files.length - 1) {
            if (this.media.length == 0) {
              this.formGrp.controls['media'].setValue(null);
              this.formGrp.controls['media'].setErrors({required: true});
            } else {
              this.formGrp.controls['media'].setValue(this.media.length + ' images !');
              this.formGrp.controls['media'].setErrors(null);
            }
          }
        });
    }
  }

  private add(): void {
    let body: any = this.formGrp.value;

    body.media = this.media;

    this.ngxSpinner.show();
    this.eventsService.addEvent(body)
      .pipe(take(1))
      .subscribe(
        value => {
          this.ngxSpinner.hide();
          this.alertBoxService.alert({
            title: 'Ajout',
            text: 'Opération terminé avec succé',
            icon: 'success'
          });
          this.dialogRef.close(value);
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.alert({
            title: 'Ajout',
            text: error.message,
            icon: 'error'
          });
        }
      );
  }

  private edit(): void {
    let body: any = this.formGrp.value;

    body.media = this.media;

    this.ngxSpinner.show();
    this.eventsService.editEvent(body, this.data.event.id)
      .pipe(take(1))
      .subscribe(
        value => {
          this.ngxSpinner.hide();
          this.alertBoxService.alert({
            title: 'Modification',
            text: 'Opération terminé avec succé',
            icon: 'success'
          });
          this.dialogRef.close(value);
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.alert({
            title: 'Modification',
            text: error.message,
            icon: 'error'
          });
        }
      );
  }
}
