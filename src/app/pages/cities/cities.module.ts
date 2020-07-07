import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CitiesRoutingModule} from './cities-routing.module';
import {CitiesComponent} from './cities.component';
import {CitiesDialogComponent} from './cities-dialog/cities-dialog.component';
import {CitiesService} from '../../services/cities.service';
import {MatTableModule} from '@angular/material/table';
import {AlertModule, TooltipModule} from 'ngx-bootstrap';
import {EndroitService} from '../../services/endroit.service';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CitiesComponent, CitiesDialogComponent],
  entryComponents: [CitiesDialogComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    MatTableModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [CitiesService, EndroitService]
})
export class CitiesModule {
}
