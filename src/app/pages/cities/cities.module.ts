import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CitiesRoutingModule} from './cities-routing.module';
import {CitiesComponent} from './cities.component';
import {CitiesDialogComponent} from './cities-dialog/cities-dialog.component';
import {CitiesService} from '../../services/cities.service';


@NgModule({
  declarations: [CitiesComponent, CitiesDialogComponent],
  entryComponents: [CitiesDialogComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule
  ],
  providers: [CitiesService]
})
export class CitiesModule {
}
