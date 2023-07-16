import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AuthComponent } from './layout/auth/auth.component';
import { DistributerComponent } from './page/distributer/distributer.component';
import { Error404Component } from './page/error404/error404.component';
import { FormPopupComponent } from './page/order/form-popup/form-popup.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children:[
      {
        path:"",
        loadChildren:()=>import('./page/dashbord/dashbord.module').then(m=>m.DashbordModule)
      },
      {
        path:"distributer",
        loadChildren:()=>import('./page/distributer/distributer.module').then(m=>m.DistributerModule)
      },
      {
        path:"retailer",
        loadChildren:()=>import('./page/retailer/retailer.module').then(m=>m.RetailerModule)
      },
      {
        path:"product",
        loadChildren:()=>import('./page/seller/seller.module').then(m=>m.SellerModule)
      },
      {
        path:"city",
        loadChildren:()=>import('./page/city/city.module').then(m=>m.CityModule)
      },
      {
        path:"order",
        loadChildren:()=>import('./page/order/order.module').then(m=>m.OrderModule)

      }
    ]
  },
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path:'**',
    component:Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
