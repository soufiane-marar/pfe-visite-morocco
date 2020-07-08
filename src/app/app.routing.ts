import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './pages/error/404.component';
import {P401Component} from './pages/error/401.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './services/login/auth.guard';
import {NotAuthGuard} from './services/login/not-auth.guard';
import {Roles} from './utils/values';
import {RoleGuard} from './utils/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '401',
    component: P401Component,
    data: {
      title: 'Page 401'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Visit Morocco'
    },
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        data: {
          roles: [Roles.ADMIN]
        }
      },
      {
        path: 'user-settings',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/user-settings/user-settings.module').then(m => m.UserSettingsModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'hebergements',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/hebergements/hebergements.module').then(m => m.HebergementsModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'restaurants',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'infos',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/infos/infos.module').then(m => m.InfosModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'cultures',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/cultures/cultures.module').then(m => m.CulturesModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'events',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/events/events.module').then(m => m.EvenementsModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'loisir',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/loisir/loisir.module').then(m => m.LoisirModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'shopping',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/shoppings/shoppings.module').then(m => m.ShoppingsModule),
        data: {
          roles: [Roles.ADMIN, Roles.USER]
        }
      },
      {
        path: 'cities',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/cities/cities.module').then(m => m.CitiesModule),
        data: {
          roles: [Roles.ADMIN]
        }
      },
      {
        path: 'categories',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule),
        data: {
          roles: [Roles.ADMIN]
        }
      },
    ]
  },
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
