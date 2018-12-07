import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   private username: String;
   private password: String;

   constructor(
      private authService: AuthService,
      private router: Router
   ) { }

   ngOnInit() { }

   onLoginSubmit() {
      this.authService.loginUser(this.username, this.password).subscribe(data => {
         if (data['success']) {
            this.authService.getEmitter().emit(data['user']);
            this.router.navigate(['/dashboard']);
         } else {
            this.router.navigate(['/login']);
         }
      });
   }

}
