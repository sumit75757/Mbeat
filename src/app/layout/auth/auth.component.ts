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
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  forgotpassword = false;
  toggleForm: boolean = false;
  authForm: FormGroup = this.fb.group({
    Role: new FormControl('Salesmen', Validators.required),
    Email: new FormControl('', Validators.email),
    Password: new FormControl('', Validators.required),
  });
  passwordForgotForm: FormGroup = this.fb.group({
    Email: new FormControl('', Validators.email),
    Password: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private auth: ApiService,
    private spiner: NgxSpinnerService,
    private Route: Router
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
    console.log("call");
    
    if (!this.toggleForm) {
      if (this.authForm.valid) {
        this.spiner.show();
        this.auth.singin(this.authForm.value).subscribe({
          next: (res: any) => {
            //console.log(res.data);
            swal.fire(res.message);
            localStorage.setItem('userdata', JSON.stringify(res.data.findUser));
            localStorage.setItem('token', JSON.stringify(res.data.token));
            this.auth.Role.next(res.data.findUser)
            this.Route.navigate(['/']);
            setTimeout(() => {
              this.spiner.hide();
            }, 600);
          },
          error: (err) => {
            console.log(err,"err");
            
            this.spiner.hide();
            swal.fire(err.error.message);
          },
        });
        //console.log('sinup', this.authForm.value);
        //console.log('login', this.authForm.value);
      }
      //console.log('sinup', this.authForm.value);
    } else {
      this.spiner.show();
      this.auth.singup(this.authForm.value).subscribe({
        next: (res: any) => {
          //console.log(res.data);
this.auth.Role.next(res.data.findUser)
          swal.fire(res.message);
          localStorage.setItem('userdata', JSON.stringify(this.authForm.value));
          localStorage.setItem('token', JSON.stringify(res.data.token));
          this.Route.navigate(['/order']);
          setTimeout(() => {
            this.spiner.hide();
          }, 600);
        },
        error: (err) => {
          console.log(err,"err");
          
          swal.fire(err.data);
          this.spiner.hide();
        },
      });
    }
  }
  forgotpass(){
    if(this.passwordForgotForm.valid){
    this.spiner.show();
      this.auth.forgot(this.passwordForgotForm.value).subscribe({
        next:(value:any)=> {
          Swal.fire(value.message)
          this.forgotpassword=false
    this.spiner.hide();
        },
        error:(err)=> {
          Swal.fire(err.message)
    this.spiner.hide();
          
        },
      });
    }
  }
}
