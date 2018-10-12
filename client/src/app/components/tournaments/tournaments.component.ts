import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-tournaments',
   templateUrl: './tournaments.component.html',
   styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
   private tournaments: any;

   constructor() {
      let tournaments = [
         {
            name: "Bounty Builder $7.50, $35K Gtd",
            buyin: 7.50,
            prizePool: 35000,
            time: {
               hour: 14,
               minute: 30
            }
         },
         {
            name: "Big $11, $40K Gtd",
            buyin: 11,
            prizePool: 10000,
            time: {
               hour: 10,
               minute: 30
            }
         },
         {
            name: "$3.30 NLHE [Win the Button], $1.5K Gtd",
            buyin: 3.30,
            prizePool: 1500,
            time: {
               hour: 17,
               minute: 15
            }
         }
      ]
      
      this.tournaments = tournaments;
   }

   ngOnInit() {

   }

}
