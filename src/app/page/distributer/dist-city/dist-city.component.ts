import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dist-city',
  templateUrl: './dist-city.component.html',
  styleUrls: ['./dist-city.component.scss']
})
export class DistCityComponent implements OnInit {
  cityId!:string;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private Route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  cityForm: FormGroup = this.fb.group({
    City: ['', [Validators.required]],
  });
  

  id: any;
  resetData() {
    this.id =''
    this.cityId = ''
    this.cityForm.reset();
  }
  removecat(){
    this.api.removecaogory(this.cityId).subscribe({
      next: (res: any) => {
        Swal.fire(res.message);
        this.id = '';
        // this.();
        this.resetData()
      },
      error: (err) => {
        //console.log(err);
        Swal.fire(err.message);
      },
    });
  }
  Update(){
    if (this.cityForm.valid) {
      this.api.updatecaogory(this.cityId,this.cityForm.value).subscribe({
        next: (res: any) => {
          Swal.fire(res.message);
          this.id = '';
          // this.getProduct();
          this.resetData()
        },
        error: (err) => {
          //console.log(err);
          Swal.fire(err.message);
        },
      });
    }
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.id = params.id;
      if (this.id) {
        this.api.getbyproduct(params.id).subscribe({
          next: (value: any) => {
            this.cityForm.patchValue(value.data[0]);
          },
        });
      }
    });
  }
  get f() {
    return this.cityForm.controls;
  }
  formSubmit() {
    // if (this.cityForm.valid) {
    //   if (this.id) {
    //     this.api.updateProduct(this.id, this.sellerForm.value).subscribe({
    //       next: (res: any) => {
    //         Swal.fire(res.message);
    //         this.Route.navigate(['/product']);
    //       },
    //       error: (err) => {
    //         //console.log(err);
    //         Swal.fire(err.message);
    //       },
    //     });
    //   } else {
    //     this.api.insertProduct(this.sellerForm.value).subscribe({
    //       next: (res: any) => {
    //         Swal.fire(res.message);
    //         this.Route.navigate(['/product']);
    //       },
    //       error: (err) => {
    //         //console.log(err);
    //         Swal.fire(err.message);
    //       },
    //     });
    //   }
    // }
  }

}
