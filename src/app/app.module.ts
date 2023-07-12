import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AuthComponent } from './layout/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { Error404Component } from './page/error404/error404.component';
import { AddEditCityComponent } from './page/city/add-edit-city/add-edit-city.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './page/order/order.component';
import { FormPopupComponent } from './page/order/form-popup/form-popup.component';
import { SharedModule } from './shared/shared/shared.module';

let pwa :any =[]

@NgModule({
  declarations: [AppComponent, NavigationComponent, AuthComponent, Error404Component, OrderComponent, FormPopupComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: environment.domain_name,
      clientId: environment.clint_Id,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    ...pwa
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(){
    if (environment.PWA) {
      pwa = ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       // Register the ServiceWorker as soon as the application is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:300'
     })
    }
  }
}
