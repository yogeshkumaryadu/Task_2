import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { HttpLoadObserverService } from './http-load-observer.service';


@Injectable({
  providedIn: 'root'
})
export class CustomInterceptorService implements HttpInterceptor {

  constructor(private httpLoadObserver: HttpLoadObserverService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpLoadObserver.incrementHttpCounter();
    
    return next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        this.httpLoadObserver.descrementHttpCounter();
      }
    }));
  }

}
