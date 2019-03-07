import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreLoginModule } from './pre-login/pre-login.module';
import { PostLoginModule } from './post-login/post-login.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment'; 
import { NgIdleModule } from '@ng-idle/core';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CustomInterceptorService } from './custom-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadObserverService } from './http-load-observer.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PreLoginModule,
    PostLoginModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgIdleModule.forRoot(),
    HttpClientModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
