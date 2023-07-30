import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';
import { FormPopupComponent } from '../order/form-popup/form-popup.component';
import { OrderPopupComponent } from '../order/order-popup/order-popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {
  id :any
  distributorData:any[] = [];
  cityData:any[] = [];
  is_show!:boolean;
  is_open!:boolean;
  cityId!:string;
  isAllvalid!:boolean;
  dataForm!:FormGroup
  distributorId!:string;

  constructor(private ActiveRoute:ActivatedRoute,private api :ApiService,private spinner:NgxSpinnerService,private router:Router,private dialog:MatDialog,private fb:FormBuilder) {
    this.dataForm = fb.group({
      distributor:['',[Validators.required]],
      distCity:['',[Validators.required]]
    })
   }
  ngOnInit(): void {
    this.is_show = false;
    this.is_open = true;
    this.isAllvalid = false;
    this.getRetailer()
    this.api.getDistributor().subscribe((res:any)=>{
      this.distributorData  = res.data
      console.log(res,"res");
      
    })
  }
  distChange(){
    this.is_open =! this.is_open; 
  }
  submit(){
    console.log("Hiii",this.dataForm.invalid);
    
    if (this.dataForm.invalid) {
      this.isAllvalid = true;
      return;
    }
    this.api.getMerchantByCity(this.cityId).subscribe((res:any)=>{
      console.log(res,"res city");
      this.retailer = res.data
      this.is_show = true;
      this.is_open = false;
      this.dataForm.reset();
      this.spinner.hide();
      
    },(err) => {
      //console.log(err);
      Swal.fire(err.message)
      this.spinner.hide();
    },)


  }
  valueChange(){
    this.api.getCityByDistributor(this.distributorId).subscribe((res:any)=>{
      this.cityData = res.data;
      console.log(res,"dist res");
      this.spinner.hide();
      
    },(err) => {
      //console.log(err);
      Swal.fire(err.message)
      this.spinner.hide();
    },)
  }
  cityValueChange(){
    console.log(this.cityId,"city Id");
    
    this.api.getMerchantByCity(this.cityId).subscribe((res:any)=>{
      console.log(res,"res city");
      this.retailer = res.data
      this.is_show = true;
      this.spinner.hide();
      
    },(err) => {
      //console.log(err);
      Swal.fire(err.message)
      this.spinner.hide();
    },)
  }
  get f(){
    return this.dataForm
  }
  orderForm(item:any[]){
    // console.log(item,"item");
    
    const dialogRef = this.dialog.open(OrderPopupComponent,{
      data:item
    })
    // this.router.navigateByUrl("/order/orderform",{state:item});
  }
  retailer:any
  getRetailer(){
    this.api.getMerchant().subscribe({
      next: (res: any) => {
        this.retailer = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        //console.log(err);
        Swal.fire(err.message)
        this.spinner.hide();
      },
    })
  }
  deleteMerchant(id:any){
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
  
          if(result.value){
              this.api.deleteMerchant(id).subscribe({
                next: (res: any) => {
                  Swal.fire(res.message)
                  this.getRetailer()
                },
                error: (err) => {
                  //console.log(err);
                  Swal.fire(err.message)
                },
              })
          }
  
      });
  }
}
