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
          if (!this.authService.isAdmin(value.user.role) && !this.authService.isUser(value.user.role)) {
            this.alertContent = `<strong>Erreur</strong> Vous ne possédez pas d'autorisation pour se connecter`;
            this.hasError = true;
            return;
          }

          this.authService.setToken(value.access_token);
          this.authService.setSession(value.user);
          this.hasError = false;
          this.router.navigate(['']);
        },
        error => {
          this.ngxSpinnerService.hide();
          console.error('Error de serveur !', error);
          if (error.status == 500) {
            this.alertContent = `<strong>${error.status} ${error.statusText} !</strong> ${error.error.message}.`;
          } else {
            this.alertContent = `<strong>${error.status} ${error.statusText} !</strong> Email ou mot de passe incorrect.`;
          }
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
