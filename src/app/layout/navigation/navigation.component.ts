import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  sidebar: boolean = false;
  isDarkEnable: boolean = false;
  user: any = JSON.parse(localStorage.getItem('user') + '');
  token: any = localStorage.getItem('token');
  routeConfig = [
    {
      name: 'Deshbord',
      icon: '',
      route: '/',
    },
    {
      name: 'Distributer',
      icon: '',
      route: '/distributer',
    },{
      name: 'Retailer',
      icon: '',
      route: '/retailer',
    },{
      name: 'Seller',
      icon: '',
      route: '/seller',
    },
  ];

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.isDarkEnable = JSON.parse(localStorage.getItem('theme') + '');
    this.addClassToBody();
    console.log(this.user, this.token);
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
  // getaudiunc(){
  //   var options:any = {
  //     method: 'POST',
  //     url: 'https://mbeat.us.auth0.com/oauth/token',
  //     headers: {'content-type': 'application/x-www-form-urlencoded'},
  //     data: {
  //       grant_type: 'authorization_code',
  //       client_id: 'X5RhAXjVxx2Tw8mcefvpmaF59xZBGLRn',
  //       client_secret: 'B19fijc1T9e7ynwye3b8pqWWk5GGiZcmklzdg7fO2iWoVd7uiKAoWc1Z5JRx9Pm1',
  //       audience: 'https://mbeat.us.auth0.com/api/v2/'
  //     }
  //   };
  //   this.http.post("https://mbeat.us.auth0.com/oauth/token",options.data).subscribe(res=>{
  //     console.log(res);
  //   })
  // }
  logout() {
    this.auth.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
