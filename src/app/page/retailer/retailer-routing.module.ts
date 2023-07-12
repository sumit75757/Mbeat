import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerComponent } from './retailer.component';
import { AddEditRetailerComponent } from './add-edit-retailer/add-edit-retailer.component';

const routes: Routes = [
  {  
    path:'',component:RetailerComponent
  },
  {
    path:'add',component:AddEditRetailerComponent
  },
  {
    path:'edit/:id',component:AddEditRetailerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule { }
