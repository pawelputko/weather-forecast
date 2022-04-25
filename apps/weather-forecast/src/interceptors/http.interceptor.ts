import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = httpRequest.clone({
      params: (httpRequest.params ? httpRequest.params : new HttpParams())
        .set('appid', environment.APP_ID)
    });

    if (httpRequest.params.get('q')) {
      this.addQueryToPath('q', httpRequest.params.get('q') as string);
    }

    if (httpRequest.params.get('mode')) {
      this.addQueryToPath('mode', httpRequest.params.get('mode') as string);
      httpRequest.params.delete('mode');
    }
    return next.handle(newReq);
  }

  private addQueryToPath(key: string, value: string): void {
    this.router.navigate([], {
      queryParams: {
        [key]: value
      },
      queryParamsHandling: 'merge'
    })
  }
}
