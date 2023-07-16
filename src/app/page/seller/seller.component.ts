import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/auth/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  constructor(private api: ApiService) {}

  product: any;

  ngOnInit(): void {
    this.getProduct()
  }
  getProduct() {
    this.api.getproduct().subscribe({
      next: (res: any) => {
        this.product = res.data;
      },
      error: (error) => {
        Swal.fire(error.message);
      },
    });
  }
  delete(id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.api.deleteProduct(id).subscribe({
          next: (res: any) => {
            Swal.fire(res.message);
            this.getProduct();
          },
          error: (err) => {
            console.log(err);
            Swal.fire(err.message);
          },
        });
      }
    });
  }
}
