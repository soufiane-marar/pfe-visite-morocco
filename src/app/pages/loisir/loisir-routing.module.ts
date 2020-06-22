import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoisirComponent} from './loisir.component';


const routes: Routes = [{
  path: '', component: LoisirComponent,
  data: {
    title: 'Loisirs'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoisirRoutingModule {
}
