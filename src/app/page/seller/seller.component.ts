import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private Route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  product: any;

  ngOnInit(): void {
    this.getProduct();
  }
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
  deletee(id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.api.deleteProduct(id).subscribe({
          next: (res: any) => {
            Swal.fire(res.message);
            this.getProduct();
          },
          error: (err) => {
            //console.log(err);
            Swal.fire(err.message);
          },
        });
      }
    });
  }
  id: any;
  catID:any
  catogroyForm: FormGroup = this.fb.group({
    ProductId: ['', [Validators.required]],
    ProductCategory: ['', [Validators.required]],
  });
  resetData() {
    this.id =''
    this.catID = ''
    this.catogroyForm.reset();
  }
  isAllvalid!:boolean
  formSubmit() {
    if(this.catogroyForm.invalid){
      this.isAllvalid = true;
      return
    }
    
    this.catogroyForm.controls['ProductId'].setValue(this.id);
    if (this.catogroyForm.valid) {
      this.api.addcaogory(this.catogroyForm.value).subscribe({
        next: (res: any) => {
          Swal.fire(res.message);
          this.id = '';
          this.getProduct();
        },
        error: (err) => {
          //console.log(err);
          Swal.fire(err.message);
        },
      });
    }
  }
  updatecat(prodId: any, cat: any) {
    this.resetData()
    this.id = prodId;
    this.catID = cat.ProductCategoryId
    this.catogroyForm.setValue({
      ProductId: prodId,
      ProductCategory: cat.ProductCategory,
    });
  }
  Update(){
    if (this.catogroyForm.valid) {
      this.api.updatecaogory(this.catID,this.catogroyForm.value).subscribe({
        next: (res: any) => {
          Swal.fire(res.message);
          this.id = '';
          this.getProduct();
          this.resetData()
        },
        error: (err) => {
          //console.log(err);
          Swal.fire(err.message);
        },
      });
    }
  }
  removecat(){
    this.api.removecaogory(this.catID).subscribe({
      next: (res: any) => {
        Swal.fire(res.message);
        this.id = '';
        this.getProduct();
        this.resetData()
      },
      error: (err) => {
        //console.log(err);
        Swal.fire(err.message);
      },
    });
  }
}
