import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RestaurantsRoutingModule} from './restaurants-routing.module';
import {RestaurantsComponent} from './restaurants.component';
import {RestauDialogComponent} from './restau-dialog/restau-dialog.component';
import {EndroitService} from '../../services/endroit.service';
import {RestaurantService} from '../../services/restaurant.service';
import {MatTableModule} from '@angular/material/table';
import {AlertModule, CarouselModule, TooltipModule} from 'ngx-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NumbersOnlyModule} from '../../directives/numbers-only/numbers-only.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [RestaurantsComponent, RestauDialogComponent],
  entryComponents: [RestauDialogComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    MatTableModule,
    TooltipModule.forRoot(),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NumbersOnlyModule,
    AlertModule.forRoot(),
    MatSelectModule,
  ],
  providers: [EndroitService, RestaurantService]
})
export class RestaurantsModule {
}
