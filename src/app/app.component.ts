import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
import { Meta } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Mbeat';

  constructor(@Inject(DOCUMENT) private doc: Document,private route:Router) {}
  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['/auth'])
    }
    if (environment.PWA) {
      let link: HTMLLinkElement = this.doc.createElement('link');
      link.setAttribute('rel', 'manifest');
      link.setAttribute('href', 'manifest.webmanifest');
      this.doc.head.appendChild(link);
    }
  }
}
