import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {AuthService} from '../../services/login/auth.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  public userSession: any = null;

  constructor(private authService: AuthService,
              private router: Router,
              private ngxSpinnerService: NgxSpinnerService,
              private alertBoxService: AlertBoxService) {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {

    this.userSession = this.authService.getSession();
  }

  public logout(): void {

    this.ngxSpinnerService.show();
    this.authService.logout()
      .pipe(take(1))
      .subscribe(
        value => {
          console.log(value);
          this.ngxSpinnerService.hide();
          this.authService.removeTokenAndSession();
          this.router.navigate(['login']);
        },
        error => {
          this.ngxSpinnerService.hide();
          console.log(error);
          this.alertBoxService.alert({
            title: 'Deconnexion',
            text: error.message,
            icon: 'error'
          });
        }
      );

  }
}
