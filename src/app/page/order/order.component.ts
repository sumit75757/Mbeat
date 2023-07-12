import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  isAllValid!:boolean;
  constructor(fb: FormBuilder) {
    this.orderForm = fb.group({
      city: ['', [Validators.required]],
      distributor_name: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
  }
  formSubmit(){

  }
  
  resetData() {
    this.orderForm.reset();
  }
}
