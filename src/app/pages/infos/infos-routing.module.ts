import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfosComponent} from './infos.component';


const routes: Routes = [{path: '', component: InfosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfosRoutingModule {
}
