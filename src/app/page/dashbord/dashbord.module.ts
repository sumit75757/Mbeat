import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    DashbordComponent,

  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    SharedModule
    

  ]
})
export class DashbordModule { }
