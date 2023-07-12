import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './city.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AddEditCityComponent } from './add-edit-city/add-edit-city.component';


@NgModule({
  declarations: [
    CityComponent,
    AddEditCityComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule
  ]
})
export class CityModule { }
