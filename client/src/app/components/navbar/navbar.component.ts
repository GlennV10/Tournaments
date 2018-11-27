import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   private name: String;
   private avatar: String;

   constructor(
      private authService: AuthService,
      private router: Router
   ) { }

   ngOnInit() {
      this.name = 'Glenn Verlinden'
      this.avatar = '/assets/images/default_picture.png';
   }

   onLogout() {
      this.authService.logoutUser().subscribe((res) => {
         this.router.navigate(['/login']);
         console.log(res);
      });
   }

}
