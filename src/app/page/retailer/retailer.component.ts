import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {

  constructor(private ActiveRoute:ActivatedRoute,private api :ApiService,private spinner:NgxSpinnerService) { }
  id :any
  ngOnInit(): void {
    this.getRetailer()
  }
  retailer:any
  getRetailer(){
    this.api.getMerchant().subscribe({
      next: (res: any) => {
        this.retailer = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        Swal.fire(err.message)
        this.spinner.hide();
      },
    })
  }
  deleteMerchant(id:any){
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
  
          if(result.value){
              this.api.deleteMerchant(id).subscribe({
                next: (res: any) => {
                  Swal.fire(res.message)
                  this.getRetailer()
                },
                error: (err) => {
                  console.log(err);
                  Swal.fire(err.message)
                },
              })
          }
  
      });
  }
}
