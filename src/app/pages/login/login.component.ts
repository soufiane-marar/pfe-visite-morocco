import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageService} from '../../utils/error-message.service';
import {AuthService} from '../../services/login/auth.service';
import {Subject} from 'rxjs';
import {AlertBoxService} from '../../utils/alert-box.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

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
              private alertBoxService: AlertBoxService) {
  }

  ngOnInit() {


    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['']);
    }

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

  }


  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value)
      .pipe(
        takeUntil(this.unsubscribeLogin)
      )
      .subscribe(
        value => {

          this.authService.setToken(value.data.accessToken);
          this.hasError = false;
          this.router.navigate(['']);
        },
        error => {
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
