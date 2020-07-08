import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/login/auth.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {INavData} from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems: INavData[] = [];

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
    console.log(this.userSession);
    this.navItems = [
      {
        title: true,
        name: '',
      },
      {
        name: 'Dashboard',
        icon: 'fa fa-desktop',
        url: '/home',
      },
      {
        title: true,
        name: 'Endroits',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        name: 'Hebergements',
        url: '/hebergements',
        icon: 'fa fa-hotel',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        name: 'Restaurants',
        url: '/restaurants',
        icon: 'fa fa-cutlery',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        name: 'Evénements',
        url: '/events',
        icon: 'fa fa-bell',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        name: 'Infos',
        url: '/infos',
        icon: 'fa fa-book',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        name: 'Loisirs',
        url: '/loisir',
        icon: 'fa fa-child',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        name: 'Cultures',
        url: '/cultures',
        icon: 'fa fa-bank',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        name: 'Shopping',
        url: '/shopping',
        icon: 'fa fa-shopping-cart',
        class: (!this.authService.isAdmin(this.userSession.role) && !this.authService.isUser(this.userSession.role)) ? 'display-none' : '',
      },
      {
        title: true,
        name: 'Paramètrage',
        class: !this.authService.isAdmin(this.userSession.role) ? 'display-none' : '',
      },
      {
        name: 'Utilisateurs',
        url: '/users',
        icon: 'fa fa-users',
        class: !this.authService.isAdmin(this.userSession.role) ? 'display-none' : '',
      },
      {
        name: 'Catégories',
        url: '/categories',
        icon: 'fa fa-cubes',
        class: !this.authService.isAdmin(this.userSession.role) ? 'display-none' : '',
      },
      {
        name: 'Villes',
        url: '/cities',
        icon: 'fa fa-cubes',
        class: !this.authService.isAdmin(this.userSession.role) ? 'display-none' : '',
      },
    ];
    console.log(this.navItems);
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
