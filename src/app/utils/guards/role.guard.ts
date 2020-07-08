import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let role: string = this.authService.getSession().role;
    let roles: string[] = next.data.roles;

    /*let hasAccess: boolean = false;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] == role) {
        hasAccess = true;
        break;
      }
    }*/

    if (roles.includes(role, 0)) {
      return true;
    } else {
      this.router.navigate(['401']);
      return false;
    }
  }

}
