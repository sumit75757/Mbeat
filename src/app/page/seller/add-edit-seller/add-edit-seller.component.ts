import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-seller',
  templateUrl: './add-edit-seller.component.html',
  styleUrls: ['./add-edit-seller.component.scss'],
})
export class AddEditSellerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private Route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  sellerForm: FormGroup = this.fb.group({
    ProductName: ['', [Validators.required]],
  });

  id: any;
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.id = params.id;
      if (this.id) {
        this.api.getbyproduct(params.id).subscribe({
          next: (value: any) => {
            this.sellerForm.patchValue(value.data[0]);
          },
        });
      }
    });
  }
  get f() {
    return this.sellerForm;
  }
  resetData() {
    this.sellerForm.reset();
  }
  isAllValid!:boolean
  formSubmit() {
    if(this.sellerForm.invalid){
      this.isAllValid = true;
      return
    }
    if (this.sellerForm.valid) {
      if (this.id) {
        this.api.updateProduct(this.id, this.sellerForm.value).subscribe({
          next: (res: any) => {
            Swal.fire(res.message);
            this.Route.navigate(['/product']);
          },
          error: (err) => {
            //console.log(err);
            Swal.fire(err.message);
          },
        });
      } else {
        this.api.insertProduct(this.sellerForm.value).subscribe({
          next: (res: any) => {
            Swal.fire(res.message);
            this.Route.navigate(['/product']);
          },
          error: (err) => {
            //console.log(err);
            Swal.fire(err.message);
          },
        });
      }
    }
  }
}
