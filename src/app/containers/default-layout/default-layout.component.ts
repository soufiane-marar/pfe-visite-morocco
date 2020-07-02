import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {AuthService} from '../../services/login/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  public userSession: any = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {

    this.userSession = this.authService.getSession();
  }

  public logout(): void {

    this.authService.removeTokenAndSession();
    this.router.navigate(['login']);
  }
}
