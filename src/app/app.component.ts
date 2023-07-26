import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
import { Route, Router } from '@angular/router';
import { ApiService } from './service/auth/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Mbeat';
  user = JSON.parse(localStorage.getItem('userdata') + '');
  token = JSON.parse(localStorage.getItem('toke') + '');

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private route: Router,
    private api: ApiService
  ) {
    if (this.user) {
      
    this.api.me({ Name: this.user.Name, Email: this.user.Email }).subscribe({
      next: (res: any) => {
        localStorage.setItem('userdata', JSON.stringify(res.data));
        this.api.Role.next(res.data)
        if(res.data.Role == 'Salesmen' && this.token){
          this.route.navigate(['/order'])
        }
        
      },
      error: (err) => {
        Swal.fire(err.message);
      },
    });
  }

  }
  ngOnInit(): void {
    
    let token = JSON.parse(localStorage.getItem('token') + '');
    if (!localStorage.getItem('token')) {
      this.route.navigate(['/auth']);
    }
    //console.log(this.user);
    

    
    if (environment.PWA) {
      let link: HTMLLinkElement = this.doc.createElement('link');
      link.setAttribute('rel', 'manifest');
      link.setAttribute('href', 'manifest.webmanifest');
      this.doc.head.appendChild(link);
    }
  }
}
