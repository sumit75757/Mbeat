import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerModule } from './seller.module';
import { AddEditSellerComponent } from './add-edit-seller/add-edit-seller.component';
import { SellerComponent } from './seller.component';

const routes: Routes = [  {
  path:'',component:SellerComponent
},
{
  path:'add',component:AddEditSellerComponent
},
{
  path:'edit/:id',component:AddEditSellerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
