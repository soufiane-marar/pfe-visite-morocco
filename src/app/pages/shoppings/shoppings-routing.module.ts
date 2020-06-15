import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingsComponent} from './shoppings.component';


const routes: Routes = [{path: '', component: ShoppingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingsRoutingModule {
}
