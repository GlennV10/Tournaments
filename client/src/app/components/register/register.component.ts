import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   private firstname: String;
   private lastname: String;
   private username: String;
   private email: String;
   private password: String;

   constructor(
      private authService: AuthService,
      private router: Router
   ) { }

   ngOnInit() { }

   onRegisterSubmit() {
      const user = {
         firstname: this.firstname,
         lastname: this.lastname,
         username: this.username,
         email: this.email,
         password: this.password
      }

      //Register user
      this.authService.registerUser(user).subscribe(data => {
         if (data['success']) {
            this.router.navigate(['/login']);
         } else {
            console.log(data['error']);
            this.router.navigate(['/register']);
         }
      });
   }

}
