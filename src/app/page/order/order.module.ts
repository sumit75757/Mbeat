import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderPopupComponent } from './order-popup/order-popup.component';


@NgModule({
  declarations: [OrderComponent, OrderPopupComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    MatDialogModule
  ]
})
export class OrderModule { }
