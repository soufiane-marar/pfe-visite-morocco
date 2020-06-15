import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HebergementsRoutingModule} from './hebergements-routing.module';
import {HebergementsComponent} from './hebergements.component';
import {HebergementDialogComponent} from './hebergement-dialog/hebergement-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {AlertModule, CarouselModule, TooltipModule} from 'ngx-bootstrap';
import {EndroitService} from '../../services/endroit.service';
import {HebergementsService} from '../../services/hebergements.service';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NumbersOnlyModule} from '../../directives/numbers-only/numbers-only.module';


@NgModule({
  declarations: [HebergementsComponent, HebergementDialogComponent],
  entryComponents: [HebergementDialogComponent],
  imports: [
    CommonModule,
    HebergementsRoutingModule,
    MatTableModule,
    TooltipModule.forRoot(),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NumbersOnlyModule,
    AlertModule.forRoot(),
  ],
  providers: [EndroitService, HebergementsService]
})
export class HebergementsModule {
}
