import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/auth/api.service';
import { take } from 'rxjs/operators';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import swal from "sweetalert2";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
})
export class DashbordComponent implements OnInit {
  constructor(private api: ApiService, private spinner: NgxSpinnerService) {}
  list: number = 10;
  users: any;
  ngOnInit(): void {
    this.spinner.show();
    this.getdata()
  }
  role:any
  getdata() {
    this.api
      .getAllUser()
      .pipe(take(this.list))
      .subscribe({
        next: (res: any) => {
          this.users = res.data;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
          swal.fire(err.message)
          this.spinner.hide();
        },
      });
  }
  roles=[
    'Admin',
    "Salesmen"

  ]
  changeLeagueOwner(event:any,id:any){
    this.api.assingRoles(id,{Role:event}).subscribe({ 
      next: (res: any) => {
      Swal.fire('User Updated')
      this.spinner.hide();
    },
    error: (err) => {
      console.log(err);
      Swal.fire('Something Wrong')
      this.spinner.hide();
    },})
  }
}
