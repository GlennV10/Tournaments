import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   private name: string;
   private avatar: string;

   constructor() { }

   ngOnInit() {
      this.name = 'Glenn Verlinden';
      this.avatar = '/assets/images/default_picture.png';
   }

}
