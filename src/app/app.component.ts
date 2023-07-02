import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
import { Meta } from '@angular/platform-browser'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Mbeat';

  constructor(@Inject(DOCUMENT) private doc: Document) {}
  ngOnInit(): void {
    if (environment.PWA) {
      let link: HTMLLinkElement = this.doc.createElement('link');
      link.setAttribute('rel', 'manifest');
      link.setAttribute('href', 'manifest.webmanifest');
      this.doc.head.appendChild(link);
    }
  }
}
