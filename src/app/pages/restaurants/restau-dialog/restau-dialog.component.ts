import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageService} from '../../../utils/error-message.service';
import {AlertBoxService} from '../../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';
import {CustomValidators} from '../../../validators/custom.validator';
import {MapDialogComponent} from '../../../components/map-dialog/map-dialog.component';
import {take} from 'rxjs/operators';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-restau-dialog',
  templateUrl: './restau-dialog.component.html',
  styleUrls: ['./restau-dialog.component.css']
})
export class RestauDialogComponent implements OnInit {
  public formGrp: FormGroup;

  public media: { path: any }[] = [];

  constructor(private formBuilder: FormBuilder,
              public frErrSrv: ErrorMessageService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              private restaurantService: RestaurantService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<RestauDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    let hbg: any = this.data.restaurant;

    this.media = hbg ? hbg.media : [];

    let specialite: string[] = [], prixCarte = null, prixMoyenne = null;
    if (hbg && hbg.extra) {
      specialite = hbg.extra.specialite.toString().split(',');
      specialite = specialite.length > 0 ? specialite : null;
      prixCarte = hbg.extra.prixCarte;
      prixMoyenne = hbg.extra.prixMoyenne;
    }

    console.log(hbg);

    this.formGrp = this.formBuilder.group(
      {
        name: new FormControl(hbg ? hbg.name : null, [Validators.required, Validators.minLength(4)]),
        startTime: new FormControl(hbg ? moment().format('YYYY-MM-DDT') + hbg.startTime : null, [Validators.required]),
        endTime: new FormControl(hbg ? moment().format('YYYY-MM-DDT') + hbg.endTime : null, [Validators.required]),
        description: new FormControl(hbg ? hbg.description : null, [Validators.minLength(15)]),
        adresse1: new FormControl(hbg ? hbg.adresse1 : null, [Validators.required]),
        adresse2: new FormControl(hbg ? hbg.adresse2 : ''),
        email: new FormControl(hbg ? hbg.email : null, [Validators.email]),
        telephone: new FormControl(hbg ? hbg.telephone : null, [Validators.minLength(10)]),
        website: new FormControl(hbg ? hbg.website : null),
        zipcode: new FormControl(hbg ? hbg.zipcode : null),
        city_id: new FormControl(hbg ? hbg.city_id : null, [Validators.required]),
        /*logo: new FormControl(hbg ? hbg.logo : null, [Validators.required]),*/
        categorie_id: new FormControl(hbg ? hbg.categorie_id : null, [Validators.required]),
        longitude: new FormControl(hbg ? hbg.longitude : null, [Validators.required]),
        latitude: new FormControl(hbg ? hbg.latitude : null, [Validators.required]),
        specialite: new FormControl(specialite, [Validators.required]),
        prixCarte: new FormControl(prixCarte, [Validators.required]),
        prixMoyenne: new FormControl(prixMoyenne, [Validators.required]),
        media: new FormControl(hbg ? hbg.media.length + ' images' : null),
      },
      {validators: [CustomValidators.CheckLatitude, CustomValidators.CheckLongitude]}
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

    if (this.media.length == 0) {
      this.alertBoxService.alert({
        icon: 'warning',
        html: `<p>Veuillez ajouter ou moins une image avec les critères suivantes : </p>
<p class="font-weight-bold">Dimension : ${environment.imageValidation.width}x${environment.imageValidation.height}px<br/>
Taille : ${environment.imageValidation.size / 1000}Ko</p>`
      });
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
        this.formGrp.controls['longitude'].markAsTouched();
        this.formGrp.controls['latitude'].markAsTouched();
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

    this.checkImageDimensions(event.target.files[0], 200, 200, 10000)
      .then(() => {
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
      })
      .catch(error => {
        this.formGrp.controls['logo'].setValue(null);
        this.formGrp.controls['logo'].setErrors(error);
        console.log(error);
        console.log(this.formGrp.controls['logo'].hasError('img_dimentions'));
      });
  }

  public fileChange(event: any): void {
    if (event.target.files.length >= 5) {
      this.formGrp.controls['media'].setValue(null);
      this.formGrp.controls['media'].setErrors({limit: true});
      return;
    }

    let hasError: boolean = false;
    let errors: any = null;
    for (let i = 0; i < event.target.files.length; i++) {
      this.checkImageDimensions(event.target.files[i], environment.imageValidation.width, environment.imageValidation.height, environment.imageValidation.size)
        .then(() => {
          if (hasError) {
            return;
          }

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

        })
        .catch(error => {
          this.media = [];
          if (errors == null) {
            errors = error;
          } else {
            errors = Object.assign(errors, error);
          }
          this.formGrp.controls['media'].setValue(null);
          this.formGrp.controls['media'].setErrors(errors);

        });

    }
  }

  private checkImageDimensions(file: File, max_width: number, max_height: number, max_size: number): Promise<any> {
    return new Promise(function (resolve, reject) {

      // Size Filter Bytes
      const allowed_types = ['image/png', 'image/jpeg'];

      if (file.size > max_size) {

        reject({img_size: 'Maximum size allowed is ' + max_size / 1000 + 'Ko'});
      }

      if (!allowed_types.includes(file.type, 0)) {
        reject({img_type: 'Only Images are allowed ( JPG | PNG )'});
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];


          if (img_height > max_height && img_width > max_width) {

            reject({
              img_dimentions: 'Maximum dimentions allowed ' + max_width + 'x' + max_height + ' px'
            });

          } else {
            resolve(null);
          }
        };
      };

      reader.readAsDataURL(file);

    });
  }

  private add(): void {
    let body: any = this.formGrp.value;

    body.specialite = body.specialite.toString();


    body.media = this.media;
    body.startTime = moment(body.startTime).format('HH:mm:ss');
    body.endTime = moment(body.endTime).format('HH:mm:ss');
    body.type = 'RST';

    console.log(body);

    this.ngxSpinner.show();
    this.restaurantService.addRestaurant(body)
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

    body.specialite = body.specialite.toString();

    body.media = this.media;
    body.startTime = moment(body.startTime).format('HH:mm:ss');
    body.endTime = moment(body.endTime).format('HH:mm:ss');
    body.type = 'RST';

    this.ngxSpinner.show();
    this.restaurantService.editRestaurant(body, this.data.restaurant.reference)
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
          this.alertBoxService.error(error);
        }
      );
  }

}
