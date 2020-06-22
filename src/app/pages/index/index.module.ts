import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {IndexRoutingModule} from './index.routing.module';
import {GoogleMapsModule} from '@angular/google-maps';
import {EndroitService} from '../../services/endroit.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    GoogleMapsModule,
    FormsModule
  ],
  providers: [EndroitService]
})
export class IndexModule {
}
