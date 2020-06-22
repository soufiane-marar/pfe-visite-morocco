import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HebergementsComponent} from './hebergements.component';


const routes: Routes = [{
  path: '', component: HebergementsComponent,
  data: {
    title: 'Hébergements'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HebergementsRoutingModule {
}
