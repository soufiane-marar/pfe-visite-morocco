import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageService} from '../../../utils/error-message.service';
import {AlertBoxService} from '../../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import {CategoriesService} from '../../../services/categories.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css']
})
export class CategoriesDialogComponent implements OnInit {

  public formGrp: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public frErrSrv: ErrorMessageService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              private categoriesService: CategoriesService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CategoriesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    let hbg: any = this.data.categorie;

    this.formGrp = this.formBuilder.group(
      {
        name: new FormControl(hbg ? hbg.name : null, [Validators.required, Validators.minLength(4)]),
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
    this.categoriesService.addCategorie(body)
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
    this.categoriesService.editCategorie(body, this.data.categorie.id)
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
