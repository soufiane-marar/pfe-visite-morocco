import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShoppingsRoutingModule} from './shoppings-routing.module';
import {ShoppingsComponent} from './shoppings.component';
import {ShoppingsDialogComponent} from './shoppings-dialog/shoppings-dialog.component';
import {ShoppingsService} from '../../services/shoppings.service';
import {MatTableModule} from '@angular/material/table';
import {AlertModule, TooltipModule} from 'ngx-bootstrap';
import {AvatarModule} from 'ngx-avatar';
import {EndroitService} from '../../services/endroit.service';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {NumbersOnlyModule} from '../../directives/numbers-only/numbers-only.module';


@NgModule({
  declarations: [ShoppingsComponent, ShoppingsDialogComponent],
  entryComponents: [ShoppingsDialogComponent],
  imports: [
    CommonModule,
    ShoppingsRoutingModule,
    MatTableModule,
    TooltipModule.forRoot(),
    AvatarModule,
    AlertModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    NumbersOnlyModule
  ],
  providers: [ShoppingsService, EndroitService]
})
export class ShoppingsModule {
}
