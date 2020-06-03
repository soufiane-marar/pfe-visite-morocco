import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Import containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './pages/error/404.component';
import {P401Component} from './pages/error/401.component';
import {LoginComponent} from './pages/login/login.component';
// Import routing module
import {AppRoutingModule} from './app.routing';
// Import 3rd party components
import {ChartsModule} from 'ng2-charts';
import {AuthService} from './services/login/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorMessageService} from './utils/error-message.service';
import {AuthGuard} from './services/login/auth.guard';
import {HttpConfigInterceptor} from './utils/http-config.interceptor';
import {AlertBoxService} from './utils/alert-box.service';
import {RoleGuard} from './utils/guards/role.guard';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from '@coreui/angular';
import {AlertModule, BsDatepickerModule, BsDropdownModule, DatepickerModule, TabsModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P401Component,
    LoginComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    AuthService, AuthGuard, RoleGuard, ErrorMessageService, AlertBoxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
