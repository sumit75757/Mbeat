import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditDistributerComponent } from './add-edit-distributer/add-edit-distributer.component';
import { DistributerComponent } from './distributer.component';

const routes: Routes = [
  {
    path:'',component:DistributerComponent
  },
  {
    path:'add',component:AddEditDistributerComponent
  },
  {
    path:'edit/:id',component:AddEditDistributerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributerRoutingModule { }
