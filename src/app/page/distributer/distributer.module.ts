import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributerRoutingModule } from './distributer-routing.module';
import { AddEditDistributerComponent } from './add-edit-distributer/add-edit-distributer.component';
import { DistributerComponent } from './distributer.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DistCityComponent } from './dist-city/dist-city.component';


@NgModule({
  declarations: [
    DistributerComponent,
    AddEditDistributerComponent,
    DistCityComponent,
  ],
  imports: [
    CommonModule,
    DistributerRoutingModule,
    SharedModule

  ]
})
export class DistributerModule { }
