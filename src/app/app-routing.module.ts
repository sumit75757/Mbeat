import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children:[
      
    ]
  },{
    path:'auth',
    component:AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
