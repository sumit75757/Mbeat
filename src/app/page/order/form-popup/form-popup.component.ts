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
import { ActivatedRoute, Router } from '@angular/router';

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
  id: any;
  editdata: any;
  constructor(
    fb: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private Route: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.getCity();
    this.getProduct();
    this.activeRoute.params.subscribe((params: any) => {
      this.id = params.id;
    });
    this.orderForm = fb.group({
      OrderDate: [new Date(), [Validators.required]],
      ProductId: ['', [Validators.required]],
      ProductCategoryId: ['', [Validators.required]],
      ProductQuantity: ['', [Validators.required]],
      SalesMen: [
        JSON.parse(localStorage.getItem('userdata') + '').Name,
        [Validators.required],
      ],
      SalesmenId: [
        JSON.parse(localStorage.getItem('userdata') + '').UserId,
        [Validators.required],
      ],
      MerchantId: ['', [Validators.required]],
      Packing: ['', [Validators.required]],
      NOS: ['', [Validators.required]],
      Scheme: [''],
    });
  }
  CityId: any;
  destributer: any;
  tableData: any;
  async ngOnInit(): Promise<void> {
    this.getCity();
    this.getProduct();
    await this.api.getbyorder(this.id).subscribe((res: any) => {
      this.CityId = res.data.merchant_details.MerchantCity;
      this.destributer = res.data.merchant_details.MerchantCity;
      //console.log(this.CityId);
      this.getDistributor({ CityId: res.data.merchant_details.MerchantCity });
      this.getcatogory(res.data.product_cat_details);
      this.getmerchant(res.data.merchant_details.distributor_details);
      this.orderForm.controls['OrderDate'].setValue(res.data.OrderDate);
      this.orderForm.controls['ProductId'].setValue(
        res.data.product_cat_details.ProductId
      );
      this.orderForm.controls['ProductCategoryId'].setValue(
        res.data.product_cat_details.ProductCategoryId
      );
      this.orderForm.controls['ProductQuantity'].setValue(
        res.data.ProductQuantity
      );
      this.orderForm.controls['SalesMen'].setValue(
        res.data.salesmen_details?.SalesMen
      );
      this.orderForm.controls['SalesmenId'].setValue(
        res.data?.salesmen_details?.SalesmenId
      );
      this.orderForm.controls['MerchantId'].setValue(
        res.data?.merchant_details?.MerchantId
      );
      this.orderForm.controls['Packing'].setValue(res.data.Packing);
      this.orderForm.controls['NOS'].setValue(res.data.NOS);
      this.orderForm.controls['Scheme'].setValue(res.data.Scheme);
      // this.orderForm.controls['CityId'].setValue(res.data.merchant_details.MerchantCity)
      // this.orderForm.setValue({
      //   OrderDate:res.data.OrderDate,
      //   ProductId: res.data.product_cat_details.ProductId,
      //   ProductCategoryId: res.data.product_cat_details.ProductCategoryId,
      //   ProductQuantity: res.data.ProductQuantity,
      //   SalesMen: res.data.salesmen_details?.SalesMen,
      //   SalesmenId: res.data?.salesmen_details?.SalesmenId,
      //   MerchantId: res.data?.merchant_details?.MerchantId,
      //   Packing: res.data?.Packing,
      //   NOS: res.data?.NOS,
      //   Scheme: res.data?.Scheme,
      //   CityId:res.data.merchant_details.MerchantCity
      // });
    });
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
        //console.log(err);
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
        //console.log(err);
        Swal.fire(err.message);
        this.spinner.hide();
      },
    });
  }
  product: any;
  getProduct() {
    this.api.getproduct().subscribe({
      next: (res: any) => {
        this.product = res.data;
      },
      error: (error) => {
        Swal.fire(error.message);
      },
    });
  }
  catogory: any;
  getcatogory(event: any) {
    //console.log(event);

    this.api.getbyproductId(event.ProductId).subscribe({
      next: (res: any) => {
        this.catogory = res.data;
      },
      error: (error) => {
        Swal.fire(error.message);
      },
    });
  }
  merchant: any;
  getmerchant(id: any) {
    this.api.getmurchant(id.DistributorId).subscribe((res: any) => {
      this.merchant = res.data;
    });
  }
  formSubmit() {
    if (!this.id) {
      this.api.addorder(this.orderForm.value).subscribe((res: any) => {
        this.merchant = res.data;
        Swal.fire(res.message);
        this.Route.navigate(['/order']);
        // this.isOpen = false;
      },(err:any)=>{
        Swal.fire(err.message);
      });
    } else {
      this.api
        .updateorder(this.id, this.orderForm.value)
        .subscribe((res: any) => {
          this.merchant = res.data;
          Swal.fire(res.message);
          this.Route.navigate(['/order']);
          // this.isOpen = false;
        },(err:any)=>{
          Swal.fire(err.message);
        });
    }
  }
  packing = ['100gm', '250gm', '500gm', '1kg', '5kg'];
  resetData() {
    this.Route.navigate(['/order']);
    // this.isOpen = false;
    this.orderForm.reset();
  }
  navigatie(id: any) {
    this.Route.navigate(['/order/add/' + id]);
  }
}
