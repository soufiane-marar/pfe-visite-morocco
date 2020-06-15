import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CulturesComponent} from './cultures.component';


const routes: Routes = [{path: '', component: CulturesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulturesRoutingModule {
}
