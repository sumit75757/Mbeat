import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distributer',
  templateUrl: './distributer.component.html',
  styleUrls: ['./distributer.component.scss'],
})
export class DistributerComponent implements OnInit {
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder
  ) {}
  cityForm: FormGroup = this.fb.group({
    CityId: ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.spinner.show();
    this.getDistributor();
    this.getCity();
    // console.log(this.Distributors,"dist");
  }
  Distributors: any;
  getDistributor() {
    this.Distributors = [];
    this.spinner.show();
    this.api.getDistributor().subscribe({
      next: (res: any) => {
        this.Distributors = res.data;
        console.log(this.Distributors, 'dist');

        this.spinner.hide();
      },
      error: (err) => {
        //console.log(err);
        // Swal.fire(err.message)
        this.spinner.hide();
      },
    });
  }

  deleteDistributor(id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.spinner.show();

        this.api.deleteDistributor(id).subscribe({
          next: (res: any) => {
            this.spinner.hide();
            Swal.fire(res.message);

            this.getDistributor();
          },
          error: (err) => {
            //console.log(err);
            this.spinner.hide();

            Swal.fire(err.message);
          },
        });
      }
    });
  }
  citys: any;
  getCity() {
    this.spinner.show();
    this.api.getCity().subscribe({
      next: (res: any) => {
        this.citys = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        //console.log(err);
        // Swal.fire(err.message)
        this.spinner.hide();
      },
    });
  }
  id: any;
  Update() {
    console.log(this.id);
    if (this.cityForm.valid) {
      this.spinner.show();
      this.api.updateDistributor(this.id, this.cityForm.value).subscribe({
        next: (res: any) => {
          this.spinner.hide();

          Swal.fire(res.message);
          this.id = '';
          this.getDistributor();
        },
        error: (err) => {
          this.spinner.hide();

          //console.log(err);
          Swal.fire(err.message);
        },
      });
    }
  }

  removecat(distId:any,id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.api.deleteDistCity(distId,id).subscribe({
          next: (res: any) => {
          this.Distributors = null
            setTimeout(() => {
              this.getDistributor();
              this.resetData();
            }, 200);
         
            this.spinner.hide();

            Swal.fire(res.message);
          },
          error: (err) => {
            //console.log(err);
            this.spinner.hide();

            Swal.fire(err.message);
          },
        });
      }
    });
  }
  resetData() {
    this.id = '';

    this.cityForm.reset();
  }
}
