import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { FormPopupComponent } from './form-popup/form-popup.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: 'edit/:id',
    component: FormPopupComponent,
  },
  {
    path: 'orderform',
    component: FormPopupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
