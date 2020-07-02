import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageService} from '../../utils/error-message.service';
import {AuthService} from '../../services/login/auth.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hasError: boolean = false;
  public alertContent: string = '';

  private unsubscribeLogin = new Subject<void>();


  constructor(private formBuilder: FormBuilder, public frErrSrv: ErrorMessageService,
              private authService: AuthService, private router: Router,
              private ngxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

  }


  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.ngxSpinnerService.show();
    this.authService.login(this.loginForm.value)
      .pipe(
        takeUntil(this.unsubscribeLogin)
      )
      .subscribe(
        value => {
          this.ngxSpinnerService.hide();
          this.authService.setToken(value.access_token);
          this.authService.setSession(value.user);

          this.hasError = false;
          this.router.navigate(['']);
        },
        error => {
          this.ngxSpinnerService.hide();
          console.error('Error de serveur !', error);

          this.alertContent = `<strong>Erreur(${error.status}), ${error.statusText}</strong> ${error.error.message}`;
          this.hasError = true;
        }
      );

  }

  ngOnDestroy() {

    // Emit something to stop all Observables
    this.unsubscribeLogin.next();
    // Complete the notifying Observable to remove it
    this.unsubscribeLogin.complete();
  }
}
