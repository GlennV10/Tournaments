import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class SessionInterceptor implements HttpInterceptor {

   constructor(
      private router: Router,
      private authService: AuthService
   ) {}

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
         if (event instanceof HttpResponse) { }
      }, (err: any) => {
         if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
               this.authService.setLoggedIn(false);
               this.router.navigate(['/login']);
            }
         }
      }));
   }

}