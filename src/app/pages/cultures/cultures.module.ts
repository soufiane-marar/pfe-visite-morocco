import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CulturesRoutingModule} from './cultures-routing.module';
import {CulturesComponent} from './cultures.component';
import {CulturesDialogComponent} from './cultures-dialog/cultures-dialog.component';
import {CulturesService} from '../../services/cultures.service';
import {MatTableModule} from '@angular/material/table';
import {AvatarModule} from 'ngx-avatar';
import {AlertModule, TimepickerModule, TooltipModule} from 'ngx-bootstrap';
import {EndroitService} from '../../services/endroit.service';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {NumbersOnlyModule} from '../../directives/numbers-only/numbers-only.module';


@NgModule({
  declarations: [CulturesComponent, CulturesDialogComponent],
  entryComponents: [CulturesDialogComponent],
  imports: [
    CommonModule,
    CulturesRoutingModule,
    MatTableModule,
    AvatarModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    NumbersOnlyModule,
    TimepickerModule.forRoot()
  ],
  providers: [CulturesService, EndroitService]
})
export class CulturesModule {
}
