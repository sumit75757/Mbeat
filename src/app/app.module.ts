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
import { DistributerComponent } from './page/distributer/distributer.component';
import { RetailerComponent } from './page/retailer/retailer.component';

let pwa :any =[]

@NgModule({
  declarations: [AppComponent, NavigationComponent, AuthComponent, DistributerComponent, RetailerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.domain_name,
      clientId: environment.clint_Id,
      authorizationParams: {
        redirect_uri: window.location.href
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
