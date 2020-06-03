import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UsersService} from '../../services/users.service';
import {MatTableModule} from '@angular/material/table';
import {TooltipModule} from 'ngx-bootstrap';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, UserDialogComponent],
  entryComponents: [UserDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    TooltipModule.forRoot(),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UsersService]
})
export class UsersModule {
}
