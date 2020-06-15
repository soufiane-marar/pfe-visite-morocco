import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './pages/error/404.component';
import {P401Component} from './pages/error/401.component';
import {LoginComponent} from './pages/login/login.component';

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
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
      },
      {
        path: 'users',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'hebergements',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/hebergements/hebergements.module').then(m => m.HebergementsModule)
      },
      {
        path: 'restaurants',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule)
      },
      {
        path: 'infos',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/infos/infos.module').then(m => m.InfosModule)
      },
      {
        path: 'cultures',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/cultures/cultures.module').then(m => m.CulturesModule)
      },
      {
        path: 'events',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/events/events.module').then(m => m.EvenementsModule)
      },
      {
        path: 'loisir',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/loisir/loisir.module').then(m => m.LoisirModule)
      },
      {
        path: 'shopping',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/shoppings/shoppings.module').then(m => m.ShoppingsModule)
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
