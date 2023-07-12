import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-retailer',
  templateUrl: './add-edit-retailer.component.html',
  styleUrls: ['./add-edit-retailer.component.scss'],
})
export class AddEditRetailerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private ActiveRoute: ActivatedRoute
  ) {}
  retailerForm: FormGroup = this.fb.group({
    CityId: ['', [Validators.required]],
    DistributorId: ['', [Validators.required]],
    MerchantName: ['', [Validators.required]],
    MerchantGSTNumber: ['', [Validators.required]],
    MerchantEmail: ['', [Validators.required]],
    MerchantTelNo: ['', [Validators.required]],
    MerchantAddress: ['', [Validators.required]],
    MerchantCity: ['', [Validators.required]],
  });

  id: any;
  ngOnInit(): void {
    this.getCity();
    this.getDistributor();
    this.ActiveRoute.params.subscribe((params: any) => {
      this.id = params.id;
      this.api.getMerchantbyid(this.id).subscribe({
        next: (res: any) => {
          this.retailerForm.patchValue(res.data);
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          Swal.fire(err.message);
          this.spinner.hide();
        },
      });
    });
  }
  citys: any;
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

  distributer: any;
  getDistributor() {
    this.api.getDistributor().subscribe({
      next: (res: any) => {
        this.distributer = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        Swal.fire(err.message);
        this.spinner.hide();
      },
    });
  }
  formSubmit() {
    this.retailerForm.controls['MerchantCity'].setValue(
      this.retailerForm.controls['CityId'].value
    );
    console.log(this.retailerForm.value);
    if (this.retailerForm.valid) {
      this.api.addMerchant(this.retailerForm.value).subscribe({
        next: (result) => {
          this.spinner.hide();
          this.route.navigate(['/retailer']);
        },
        error: (err) => {
          console.log(err);
          Swal.fire(err.message);
          this.spinner.hide();
        },
      });
    }
  }
  resetData() {
    this.retailerForm.reset();
  }
}
