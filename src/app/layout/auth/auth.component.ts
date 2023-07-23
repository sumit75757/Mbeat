import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import swal from "sweetalert2";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  toggleForm: boolean = false;
  authForm: FormGroup = this.fb.group({
    Role:new FormControl('Salesmen', Validators.required),
    Email: new FormControl('', Validators.email),
    Password: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private auth: ApiService,
    private spiner: NgxSpinnerService,
    private Route : Router
  ) {}

  toggle() {
    this.toggleForm = !this.toggleForm;
    this.fomrControladd();
  }

  ngOnInit() {
    this.fomrControladd();
  }

  fomrControladd() {
    if (!this.toggleForm) {
      this.authForm.removeControl('Name');
    } else {
      this.authForm.addControl(
        'Name',
        new FormControl('', Validators.required)
      );
    }
  }
  submit() {
    //console.log(this.authForm.value,this.toggleForm);
    if (this.authForm.valid) {
      if (!this.toggleForm) {
        this.spiner.show();
        this.auth.singin(this.authForm.value).subscribe({
          next: (res: any) => {
            //console.log(res.data);
            swal.fire(res.message)
            localStorage.setItem('userdata',JSON.stringify(res.data.findUser));
            localStorage.setItem('token', JSON.stringify(res.data.token));
            this.Route.navigate(['/'])
            setTimeout(() => {
              this.spiner.hide();
            }, 600);
          },
          error: (err) => {
            this.spiner.hide();
            swal.fire(err.message)

          },
        });
        //console.log('sinup', this.authForm.value);
        //console.log('login', this.authForm.value);
      } else {
        this.spiner.show();
        this.auth.singup(this.authForm.value).subscribe({
          next: (res: any) => {
            //console.log(res.data);
            swal.fire(res.message)
            localStorage.setItem('userdata',JSON.stringify(this.authForm.value));
            localStorage.setItem('token', JSON.stringify(res.data.token));
            this.Route.navigate(['/'])
            setTimeout(() => {
              this.spiner.hide();
            }, 600);
          },
          error: (err) => {
            swal.fire(err.data)
            this.spiner.hide();
          },
        });
        //console.log('sinup', this.authForm.value);
      }
    }
  }
}
