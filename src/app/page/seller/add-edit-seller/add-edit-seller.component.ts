import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-seller',
  templateUrl: './add-edit-seller.component.html',
  styleUrls: ['./add-edit-seller.component.scss']
})
export class AddEditSellerComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  sellerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    address:['',[Validators.required]],
    city: ['', [Validators.required]],
    state:['',[Validators.required]],
    zipcode: ['', [Validators.required]],
    mobilenumber: ['', [Validators.required]],
    gstnumber: ['', [Validators.required]],
    bankname: ['', [Validators.required]],
    ifsccode: ['',[Validators.required]],
    cheque_number1: ['',[Validators.required]],
    cheque_number2: ['',[Validators.required]],
  });
 

  ngOnInit(): void {
  }
  get f() {
    return this.sellerForm.controls;
  }
  resetData() {
    this.sellerForm.reset();
  }
  formSubmit(){
    console.log(this.sellerForm.value);
    
  }

}
