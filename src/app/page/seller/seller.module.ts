import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { SellerComponent } from './seller.component';
import { AddEditSellerComponent } from './add-edit-seller/add-edit-seller.component';


@NgModule({
  declarations: [
    SellerComponent,AddEditSellerComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule
  ]
})
export class SellerModule { }
