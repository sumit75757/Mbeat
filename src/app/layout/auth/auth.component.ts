import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl ,Validators} from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  toggleForm:boolean = false
  authForm:FormGroup = this.fb.group({
    email:new FormControl('',Validators.email),
    password:new FormControl('',Validators.required),
  });

  constructor(private fb :FormBuilder,public auth: AuthService) { }

  toggle(){
    this.toggleForm = !this.toggleForm; 
    this.fomrControladd()
  }

  ngOnInit() {
    this.fomrControladd()
  }

  fomrControladd(){
    if (!this.toggleForm) {
      this.authForm.removeControl('username')
    }else{
      this.authForm.addControl('username',new FormControl('',Validators.required))
    }
  }
  submit(){
    if (this.authForm.valid) {
      if (!this.toggleForm) {
        console.log("login",this.authForm.value);
      }
      else{
        console.log("sinup",this.authForm.value);
      }
    }
  }
 

}
