import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoisirRoutingModule} from './loisir-routing.module';
import {LoisirComponent} from './loisir.component';
import {LoisirDialogComponent} from './loisir-dialog/loisir-dialog.component';
import {LoisirService} from '../../services/loisir.service';
import {AlertModule, TimepickerModule, TooltipModule} from 'ngx-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {AvatarModule} from 'ngx-avatar';
import {EndroitService} from '../../services/endroit.service';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {NumbersOnlyModule} from '../../directives/numbers-only/numbers-only.module';


@NgModule({
  declarations: [LoisirComponent, LoisirDialogComponent],
  entryComponents: [LoisirDialogComponent],
  imports: [
    CommonModule,
    LoisirRoutingModule,
    TooltipModule.forRoot(),
    MatTableModule,
    AlertModule.forRoot(),
    AvatarModule,
    MatDialogModule,
    ReactiveFormsModule,
    NumbersOnlyModule,
    TimepickerModule.forRoot()
  ],
  providers: [LoisirService, EndroitService]
})
export class LoisirModule {
}
