import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheService } from './cache.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {
   constructor( private cache : CacheService  ){  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedData = this.cache.get(request.url);
    if (cachedData) {
      return of(new HttpResponse({ body: cachedData, status: 200 }));
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
         this.cache.set(event.url, event.body,1);
        }
        return event;
      }));
  }
}

export const InterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true }
];
