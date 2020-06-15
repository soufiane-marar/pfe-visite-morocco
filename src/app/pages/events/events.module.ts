import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {EventsDialogComponent} from './events-dialog/events-dialog.component';
import {EventsService} from '../../services/events.service';
import {MatTableModule} from '@angular/material/table';
import {AvatarModule} from 'ngx-avatar';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {EndroitService} from '../../services/endroit.service';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {NumbersOnlyModule} from '../../directives/numbers-only/numbers-only.module';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';


@NgModule({
  declarations: [EventsComponent, EventsDialogComponent],
  entryComponents: [EventsDialogComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatTableModule,
    AvatarModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    NumbersOnlyModule
  ],
  providers: [
    EventsService, EndroitService,
  ]
})
export class EvenementsModule {
}
