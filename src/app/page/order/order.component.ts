import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private spinner: NgxSpinnerService
  ) {}
  id: any;
  order: any;
  userdata:any
  ngOnInit(): void {
    this.api.Role.subscribe((user:any)=>{
      if(user.Role == "Salesmen"){
        this.getorder(user.UserId);
      }
      else{
        this.getorder(user.UserId);
      }
    })
  }
  getorder(id?:any) {
    if (id) {
      this.api.getorder(id).subscribe({
        next: (res: any) => {
          this.order = res.data;
          this.spinner.hide();
        },
        error: (err) => {
          //console.log(err);
          Swal.fire(err.message);
          this.spinner.hide();
        },
      });
    } else {
      this.api.getorder().subscribe({
        next: (res: any) => {
          this.order = res.data;
          this.spinner.hide();
        },
        error: (err) => {
          //console.log(err);
          Swal.fire(err.message);
          this.spinner.hide();
        },
      });
    }
  }
  deleteOrder(id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.api.removeorder(id).subscribe({
          next: (res: any) => {
            this.order = res.data;
            this.spinner.hide();
            this.getorder()
          },
          error: (err) => {
            //console.log(err);
            Swal.fire(err.message);
            this.spinner.hide();
          },
        });
      }
    });
    
  }
  
}
