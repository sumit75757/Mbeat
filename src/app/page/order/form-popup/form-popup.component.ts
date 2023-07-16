import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OrderComponent } from '../order.component';
import { ApiService } from 'src/app/service/auth/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss'],
})
export class FormPopupComponent implements OnInit {
  // selectReason = ['Pause current course','Quit course','Switch course'];
  isOpen = true;
  orderForm!: FormGroup;
  isAllValid!: boolean;
  constructor(
    fb: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private Route: Router

  ) {
    this.orderForm = fb.group({
      cityId: ['', [Validators.required]],
      distributor_name: ['', [Validators.required]],
    });
  }

  tableData: any;
  ngOnInit(): void {
    this.getCity();
  }
  distibuter: any;
  citys: any;
  getDistributor(id: any) {
    this.api.getDistributorbyCity(id.CityId).subscribe({
      next: (res: any) => {
        this.distibuter = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        Swal.fire(err.message);
        this.spinner.hide();
      },
    });
  }
  getCity() {
    this.api.getCity().subscribe({
      next: (res: any) => {
        this.citys = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        Swal.fire(err.message);
        this.spinner.hide();
      },
    });
  }
  merchant: any;
  formSubmit() {
    console.log(this.orderForm.value);
    this.api
      .getmurchant(this.orderForm.value.distributor_name)
      .subscribe((res: any) => {
        this.merchant = res.data;
        this.isOpen = false;  
      });
  }

  resetData() {
    this.isOpen = false;
    this.orderForm.reset();
  }
  navigatie(id:any){
    console.log(id);
    
    this.Route.navigate(['/order/add/'+id])
  }
}
