import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InfosRoutingModule} from './infos-routing.module';
import {InfosComponent} from './infos.component';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {AlertModule, TimepickerModule, TooltipModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {NumbersOnlyModule} from '../../directives/numbers-only/numbers-only.module';
import {MatDialogModule} from '@angular/material/dialog';
import {AvatarModule} from 'ngx-avatar';


@NgModule({
  declarations: [InfosComponent, InfoDialogComponent],
  entryComponents: [InfoDialogComponent],
    imports: [
        CommonModule,
        InfosRoutingModule,
        MatTableModule,
        TooltipModule.forRoot(),
        AlertModule.forRoot(),
        ReactiveFormsModule,
        NumbersOnlyModule,
        MatDialogModule,
        AvatarModule,
        TimepickerModule.forRoot()
    ]
})
export class InfosModule {
}
