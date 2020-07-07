import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../interfaces/User';
import {ErrorMessageService} from '../../../utils/error-message.service';
import {CustomValidators} from '../../../validators/custom.validator';
import {UsersService} from '../../../services/users.service';
import {take} from 'rxjs/operators';
import {AlertBoxService} from '../../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {


  public userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public frErrSrv: ErrorMessageService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public usersService: UsersService,
              public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

    let user: User = this.data.user;

    this.userForm = this.formBuilder.group(
      {
        first_name: new FormControl(user ? user.first_name : '', [Validators.required, Validators.minLength(2)]),
        last_name: new FormControl(user ? user.last_name : '', [Validators.required, Validators.minLength(2)]),
        email: new FormControl(user ? user.email : '', [Validators.required, Validators.email]),
        role: new FormControl(user ? user.role : null, [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
      {validator: CustomValidators.MatchPasswords}
    );

  }


  public close(): void {
    this.dialogRef.close();
  }

  public confirm(): void {

    if (this.userForm.invalid) {
      return;
    }

    if (this.data.isnew) {
      this.add();
    } else {
      this.edit();
    }
  }

  private add(): void {
    let user: User = this.userForm.value;

    // @ts-ignore
    user.c_password = user.password2;

    // @ts-ignore
    delete user.password2;


    this.ngxSpinner.show();
    this.usersService.addUser(user)
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
    let user: User = this.userForm.value;
    // @ts-ignore
    user.c_password = user.password2;

    // @ts-ignore
    delete user.password2;

 /*   if (user.email == this.data.user.email) {
      delete user.email;
    }*/


    this.ngxSpinner.show();
    this.usersService.editUser(user, this.data.user.id)
      .pipe(take(1))
      .subscribe(
        value => {
          console.log(value);
          this.ngxSpinner.hide();
          this.alertBoxService.alert({
            title: 'Modification',
            text: 'Opération terminé avec succé',
            icon: 'success'
          });
          user.id = this.data.user.id;
          this.dialogRef.close(user);
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
