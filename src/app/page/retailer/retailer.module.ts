import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerRoutingModule } from './retailer-routing.module';
import { RetailerComponent } from './retailer.component';
import { AddEditRetailerComponent } from './add-edit-retailer/add-edit-retailer.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [RetailerComponent,AddEditRetailerComponent],
  imports: [
    CommonModule,
    RetailerRoutingModule,SharedModule
  ]
})
export class RetailerModule { }
