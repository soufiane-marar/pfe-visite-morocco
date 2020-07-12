import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageService} from '../../../utils/error-message.service';
import {AlertBoxService} from '../../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import {CitiesService} from '../../../services/cities.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-cities-dialog',
  templateUrl: './cities-dialog.component.html',
  styleUrls: ['./cities-dialog.component.css']
})
export class CitiesDialogComponent implements OnInit {

  public formGrp: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public frErrSrv: ErrorMessageService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              private citiesService: CitiesService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CitiesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    let hbg: any = this.data.city;

    this.formGrp = this.formBuilder.group(
      {
        name: new FormControl(hbg ? hbg.name : null, [Validators.required]),
      }
    );

    if (!this.data.isnew) {
      this.alertBoxService.markFormGroupTouched(this.formGrp);
    }

  }

  public close(): void {
    this.dialogRef.close();
  }

  public confirm(): void {

    if (this.formGrp.invalid) {
      return;
    }

    if (this.data.isnew) {
      this.add();
    } else {
      this.edit();
    }
  }

  private add(): void {
    let body: any = this.formGrp.value;


    this.ngxSpinner.show();
    this.citiesService.addCity(body)
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
          this.alertBoxService.error(error);
        }
      );
  }

  private edit(): void {

    let body: any = this.formGrp.value;

    this.ngxSpinner.show();
    this.citiesService.editCity(body, this.data.city.id)
      .pipe(take(1))
      .subscribe(
        () => {
          this.ngxSpinner.hide();
          this.alertBoxService.alert({
            title: 'Modification',
            text: 'Opération terminé avec succé',
            icon: 'success'
          });
          this.dialogRef.close(body);
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.error(error);
        }
      );
  }

}
