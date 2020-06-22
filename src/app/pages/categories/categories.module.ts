import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesComponent} from './categories.component';
import {CategoriesDialogComponent} from './categories-dialog/categories-dialog.component';
import {CategoriesService} from '../../services/categories.service';
import {AlertModule, TooltipModule} from 'ngx-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {EndroitService} from '../../services/endroit.service';


@NgModule({
  declarations: [CategoriesComponent, CategoriesDialogComponent],
  entryComponents: [CategoriesDialogComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AlertModule.forRoot(),
    MatTableModule,
    TooltipModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [CategoriesService, EndroitService]
})
export class CategoriesModule {
}
