import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(
      private authService: AuthService,
      private router: Router
   ) { }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
         if (this.authService.isLoggedIn()) {
            return true;
         } else {
            return this.authService.getUserStatus()
               .pipe(map(isLoggedIn => {
                  if (isLoggedIn) {
                     this.authService.setLoggedIn(true);
                     return true;
                  } else {
                     this.authService.setLoggedIn(false);
                     this.router.navigate(['/login']);
                     return false;
                  }
               }));
         }
   }
}
