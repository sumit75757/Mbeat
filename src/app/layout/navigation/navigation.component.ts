import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  sidebar: boolean = false;
  isDarkEnable: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.isDarkEnable = JSON.parse(localStorage.getItem('theme') + '');
    this.addClassToBody()
  }
  changeTheme() {
    this.isDarkEnable = !this.isDarkEnable ;
    console.log(this.isDarkEnable);
    localStorage.setItem('theme', JSON.stringify(this.isDarkEnable));
    this.addClassToBody()
  }
  toggle() {
    this.sidebar = !this.sidebar;
    console.log(this.sidebar);
  }

  addClassToBody(){
    if (this.isDarkEnable) {
      document.body.classList.add('dark');
    }else{
      document.body.classList.remove('dark');

    }
  }
}
