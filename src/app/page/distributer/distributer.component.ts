import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distributer',
  templateUrl: './distributer.component.html',
  styleUrls: ['./distributer.component.scss']
})
export class DistributerComponent implements OnInit {


  constructor(private api: ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getDistributor()
  }
  Distributors: any;
  getDistributor() {
    this.api.getDistributor().subscribe({
      next: (res: any) => {
        this.Distributors = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        Swal.fire(err.message)
        this.spinner.hide();
      },
    });
  }
  
  deleteDistributor(id:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {

        if(result.value){
            this.api.deleteDistributor(id).subscribe({
              next: (res: any) => {
                Swal.fire(res.message)
                this.getDistributor()
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
