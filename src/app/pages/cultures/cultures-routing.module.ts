import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CulturesComponent} from './cultures.component';


const routes: Routes = [{
  path: '', component: CulturesComponent,
  data: {
    title: 'Cultures'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulturesRoutingModule {
}
