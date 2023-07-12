import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrls: ['./add-edit-city.component.scss'],
})
export class AddEditCityComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private ActiveRoute: ActivatedRoute
  ) {}

  cityForm: FormGroup = this.fb.group({
    State: ['', [Validators.required]],
    District: ['', [Validators.required]],
    CityName: ['', [Validators.required]],
  });
  id: any;
  ngOnInit(): void {
    this.ActiveRoute.params.subscribe((params: any) => {
      this.id = params.id;
      this.api.getCitybyid(this.id).subscribe((res: any) => {
        console.log(res);
        this.cityForm.patchValue(res.data);
      });
    });
  }

  get f() {
    return this.cityForm.controls;
  }
  resetData() {
    this.cityForm.reset();
  }
  formSubmit() {
    this.spinner.show();
    if (!this.id) {
      if (this.cityForm.valid) {
        this.api.addCity(this.cityForm.value).subscribe({
          next: (res:any) => {
            swal.fire(res.message)
            this.spinner.hide();
            this.route.navigate(['/city']);
          },
          error: (err) => {
            swal.fire(err.message)
            this.spinner.hide();
          },
        });
      }
    }else{
      if (this.cityForm.valid) {
        this.api.updateCity(this.id,this.cityForm.value).subscribe({
          next: (res:any) => {
            swal.fire(res.message)
            this.spinner.hide();
            this.route.navigate(['/city']);
          },
          error: (err) => {
            swal.fire(err.message)
            this.spinner.hide();
          },
        });
      }
    }
  }
}
