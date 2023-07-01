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
@NgModule({
  declarations: [AppComponent, NavigationComponent, AuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AuthModule.forRoot({
      domain: environment.domain_name,
      clientId: environment.clint_Id,
      authorizationParams: {
        redirect_uri: "https://d0ee-2409-40c1-2-aa8c-7092-20fb-416e-70b3.ngrok-free.app/"
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
