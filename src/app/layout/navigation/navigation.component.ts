import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  sidebar: boolean = false;
  isDarkEnable: boolean = false;
  token: any = localStorage.getItem('token');
  routeConfig = [
    {
      name: 'Deshbord',
      icon: 'fa-solid fa-house',
      route: '/',
    },
    {
      name: 'Distributer',
      icon: 'fa-solid fa-building-circle-arrow-right',
      route: '/distributer',
    },{
      name: 'Retailer',
      icon: 'fa-solid fa-store',
      route: '/retailer',
    },{
      name: 'Merchant',
      icon: 'fa-solid fa-users',
      route: '/merchant',
    },
    {
      name: 'order',
      icon: 'fa-solid fa-cart-shopping',
      route: '/order',
    },
  ];

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private meta: Meta,
    private route:Router
  ) {}
  user:any
  ngOnInit(): void {
    this.isDarkEnable = JSON.parse(localStorage.getItem('theme') + '');
    this.user = JSON.parse(localStorage.getItem('userdata') + '');
    if (this.user.Role == "Admin") {
      this.routeConfig.push({
        name: 'City',
        icon: 'fa-solid fa-city',
        route: '/city',
      })
    }
    this.addClassToBody();
  }
  changeTheme() {
    this.isDarkEnable = !this.isDarkEnable;
    console.log(this.isDarkEnable);
    localStorage.setItem('theme', JSON.stringify(this.isDarkEnable));
    this.addClassToBody();
  }
  toggle() {
    this.sidebar = !this.sidebar;
    console.log(this.sidebar);
  }

  addClassToBody() {
    if (this.isDarkEnable) {
      this.meta.removeTag('theme-color');
      this.meta.addTag({ name: 'theme-color', content: '#1f2937' });
      document.body.classList.add('dark');
      document.body.classList.add('bg-gray-900');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
      this.meta.removeTag('theme-color');
      this.meta.addTag({ name: 'theme-color', content: '#fff' });
    }
  }
  googleLogin() {
    this.auth.loginWithPopup().subscribe(
      (res) => {
        console.log(res);
        this.auth.getAccessTokenSilently().subscribe(
          (res) => {
            localStorage.setItem('token', res);

            console.log(res);
          },
          (err) => {
            console.log('err', err);
          }
        );
        this.auth.idTokenClaims$.subscribe(
          (res) => {
            console.log('id:', res);
            localStorage.setItem('user', JSON.stringify(res));
          },
          (err) => {
            console.log('err', err);
          }
        );
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  logout() {
    this.route.navigate(['/auth'])
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
