import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  constructor(private api: ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCity()
  }
  citys: any;
  getCity() {
    this.api.getCity().subscribe({
      next: (res: any) => {
        this.citys = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        //console.log(err);
        // Swal.fire(err.message)
        this.spinner.hide();
      },
    });
  }
  deleteCity(id:any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {

        if(result.value){
            this.api.deleteCity(id).subscribe({
              next: (res: any) => {
                Swal.fire(res.message)
                this.getCity()
              },
              error: (err) => {
                //console.log(err);
                Swal.fire(err.message)
              },
            })
        }

    });
  }
}
