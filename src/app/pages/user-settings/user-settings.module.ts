import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserSettingsRoutingModule} from './user-settings-routing.module';
import {UserSettingsComponent} from './user-settings.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersService} from '../../services/users.service';


@NgModule({
  declarations: [UserSettingsComponent],
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UsersService]
})
export class UserSettingsModule {
}
