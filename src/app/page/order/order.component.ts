import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  constructor(private  activeRoute:ActivatedRoute ){}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params)=>{
      
      
    })
  }
  

}
