import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import swal from 'sweetalert2';

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
  ) {
    this.ActiveRoute.params.subscribe((params: any) => {
      this.id = params.id;
      if (this.id) {
        this.cityForm = this.fb.group({
          State: ['', [Validators.required]],
          CityName: ['', [Validators.required]],
          CityArea: ['', [Validators.required]],
        });
      } else {
        this.cityForm = this.fb.group({
          State: ['', [Validators.required]],
          CityName: ['', [Validators.required]],
          CityArea: this.fb.array([]),
        });
      }
      if (this.id) {
        this.api.getCitybyid(this.id).subscribe((res: any) => {
          this.cityForm.patchValue(res.data);
        });
      } else {
      }
    });
  }

  cityForm!: FormGroup;
  initForm() {}
  id: any;
  ngOnInit(): void {}
  get cityAreas() {
    return this.cityForm.get('CityArea') as FormArray;
  }

  addCreds() {
    this.cityAreas.push(this.fb.control(''));
  }

  get f() {
    return this.cityForm.controls;
  }

  resetData() {
    this.cityForm.reset();
  }
  formSubmit() {
    // this.spinner.show();
    //console.log(this.cityForm.value);
    if (!this.id) {
      if (this.cityForm.valid) {
        this.spinner.show();
        this.api.addCity(this.cityForm.value).subscribe({
          next: (res: any) => {
            swal.fire(res.message);
            this.spinner.hide();
            this.route.navigate(['/city']);
            this.spinner.hide();
          },
          error: (err) => {
            swal.fire(err.message);
            this.spinner.hide();
          },
        });
      }
    } else {
      if (this.cityForm.valid) {
        this.api.updateCity(this.id, this.cityForm.value).subscribe({
          next: (res: any) => {
            swal.fire(res.message);
            this.spinner.hide();
            this.route.navigate(['/city']);
          },
          error: (err) => {
            swal.fire(err.message);
            this.spinner.hide();
          },
        });
      }
    }
  }
  removeField(index: number) {
    this.cityAreas.removeAt(index);
  }
}
