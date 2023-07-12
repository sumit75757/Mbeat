import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { AddEditCityComponent } from './add-edit-city/add-edit-city.component';

const routes: Routes = [
  {
    path:'',component:CityComponent
  },
  {
    path:'add',component:AddEditCityComponent
  },
  {
    path:'edit/:id',component:AddEditCityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
