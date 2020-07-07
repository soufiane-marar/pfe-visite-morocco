import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageService} from '../../utils/error-message.service';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomValidators} from '../../validators/custom.validator';
import {UsersService} from '../../services/users.service';
import {take} from 'rxjs/operators';
import {AuthService} from '../../services/login/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  userForm: FormGroup;

  public userSession: any = null;

  constructor(private formBuilder: FormBuilder,
              public frErrSrv: ErrorMessageService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              private authService: AuthService,
              private usersService: UsersService,) {
  }

  ngOnInit(): void {

    this.userSession = this.authService.getSession();

    this.userForm = this.formBuilder.group(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
      {validator: CustomValidators.MatchPasswords}
    );
  }

  public changePassword(): void {

    if (this.userForm.invalid) {
      return;
    }

    this.alertBoxService.confirm('Mot de passe', 'Etes vous sûre de modifier votre mot de passe ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();

          this.usersService.changePassword(this.userForm.value.password, this.userForm.value.password2)
            .pipe(take(1))
            .subscribe(
              value => {

                console.log(value);
                this.ngxSpinner.hide();
                this.alertBoxService.alert({
                  title: 'Mot de passe',
                  text: 'Opération terminé avec succé',
                  icon: 'success'
                });
              },
              error => {
                this.ngxSpinner.hide();
                console.log(error);

                this.alertBoxService.alert({
                  title: 'Mot de passe',
                  text: error.message,
                  icon: 'error'
                });
              }
            );
        }
      });
  }

}
