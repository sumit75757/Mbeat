import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributerRoutingModule } from './distributer-routing.module';
import { AddEditDistributerComponent } from './add-edit-distributer/add-edit-distributer.component';
import { DistributerComponent } from './distributer.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    DistributerComponent,
    AddEditDistributerComponent,
  ],
  imports: [
    CommonModule,
    DistributerRoutingModule,
    SharedModule

  ]
})
export class DistributerModule { }
