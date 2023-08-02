import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-distributer',
  templateUrl: './add-edit-distributer.component.html',
  styleUrls: ['./add-edit-distributer.component.scss'],
})
export class AddEditDistributerComponent implements OnInit {
  isAllvalid!:boolean;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private ActiveRoute: ActivatedRoute
  ) {}

  distributorForm: FormGroup = this.fb.group({
    CityId: ['', [Validators.required]],
    DistributorName: ['', [Validators.required]],
    DistributorEmail: ['', [Validators.required]],
    DistributorTelNo: ['', [Validators.required]],
    DistributorAddress: ['', [Validators.required]],
    FirmName: ['', [Validators.required]],
    // DistributorCity: ['', [Validators.required]],
    BankName: [''],
    IFSCCode: [''],
    ChequeNumber1: [''],
    ChequeNumber2: [''],
  });

  id: any;
  ngOnInit(): void {
    this.getCity();

    this.ActiveRoute.params.subscribe((params: any) => {
      this.id = params.id;
      let selectedCities: any;
      if (this.id) {
        this.api.getDistributorbyid(this.id).subscribe((res: any) => {
          if (res.data.dist_details.length > 0) {
            selectedCities = res.data.dist_details.map((element: any) => {
              return {
                CityArea: element.DistributorCityName,
                CityId: element.DistributorCityId,
                State: '',
                CityName: '',
                CreatedAt: element.CreatedAt,
                UpdatedAt: element.UpdatedAt,
              };
            });
            console.log(selectedCities);
          } else {
            this.distributorForm.controls['CityId'].setValue([]); // If no cities are selected, set an empty array
          }
          console.log(res, 'res of API');
          this.distributorForm.patchValue(res.data);
          this.distributorForm.controls['CityId'].setValue(selectedCities);
        });
      }
    });
  }

  citys: any;
  getCity() {
    this.api.getCity().subscribe({
      next: (res: any) => {
        this.citys = res.data;
        this.spinner.hide();
        console.log(this.citys);
      },
      error: (err) => {
        //console.log(err);
        Swal.fire(err.message);
        this.spinner.hide();
      },
    });
  }
  get f() {
    return this.distributorForm;
  }
  resetData() {
    this.route.navigateByUrl('/distributer');
    this.distributorForm.reset();
  }
  formSubmit() {
    if(!this.distributorForm.valid){
      this.isAllvalid = true;
      return
    }
    // this.distributorForm.controls['DistributorCity'].setValue(this.distributorForm.controls['CityId'].value)
    this.spinner.show();
    if (!this.id) {
      if (this.distributorForm.valid) {
        this.api.addDistributor(this.distributorForm.value).subscribe({
          next: (res: any) => {
            Swal.fire(res.message);
            this.spinner.hide();
            this.route.navigate(['/distributer']);
          },
          error: (err) => {
            Swal.fire(err.message);
            this.spinner.hide();
          },
        });
      }
    } else {
      console.log(this.distributorForm.value);
      if (this.distributorForm.valid) {
        delete this.distributorForm.value.CityId
        this.api
          .updateDistributor(this.id, this.distributorForm.value)
          .subscribe({
            next: (res: any) => {
              Swal.fire(res.message);
              this.spinner.hide();
              this.route.navigate(['/distributer']);
            },
            error: (err) => {
              Swal.fire(err.message);
              this.spinner.hide();
            },
          });
      }
    }
  }
}
