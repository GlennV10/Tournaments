import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-tournaments',
   templateUrl: './tournaments.component.html',
   styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
   private tournaments: any;
   private buyins: any;
   private speeds: any;
   private minBuyin: Number;
   private maxBuyin: Number;

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

      let buyins = [
         { step: 0, level: 0.11, checked: true },
         { step: 1, level: 0.27, checked: true },
         { step: 2, level: 0.55, checked: true },
         { step: 3, level: 1.10, checked: true },
         { step: 4, level: 2.20, checked: true },
         { step: 5, level: 3.30, checked: true },
         { step: 6, level: 4.40, checked: true },
         { step: 7, level: 5.50, checked: true },
         { step: 8, level: 7.50, checked: true },
         { step: 9, level: 8.88, checked: true },
         { step: 10, level: 11, checked: true },
         { step: 11, level: 16.50, checked: true },
         { step: 12, level: 22, checked: true },
         { step: 13, level: 27, checked: true },
         { step: 14, level: 33, checked: true },
         { step: 15, level: 44, checked: true },
         { step: 16, level: 55, checked: true },
         { step: 17, level: 82, checked: true },
         { step: 18, level: 109, checked: true },
         { step: 19, level: 162, checked: true },
         { step: 20, level: 215, checked: true },
         { step: 21, level: 320, checked: true },
         { step: 22, level: 530, checked: true },
         { step: 23, level: 1050, checked: true }
      ];

      let speeds = [
         { name: 'Slow', checked: true },
         { name: 'Regular', checked: true },
         { name: 'Turbo', checked: true },
         { name: 'Hyper-Turbo', checked: true },
         { name: 'Bubble Rush', checked: true }
      ];
      
      this.tournaments = tournaments;
      this.buyins = buyins;
      this.speeds = speeds;

      this.minBuyin = this.buyins[0];
      this.maxBuyin = this.buyins[23];
   }

   ngOnInit() {

   }

   onMinBuyinChange(event: Event) {
      if (this.maxBuyin["step"] < event.target["value"]) {
         this.maxBuyin = this.buyins[event.target["value"]];
      }
      this.minBuyin = this.buyins[event.target["value"]];
   }

   onMaxBuyinChange(event: Event) {      
      if (this.minBuyin["step"] > event.target["value"]) {
         this.minBuyin = this.buyins[event.target["value"]];
      }
      this.maxBuyin = this.buyins[event.target["value"]];
   }

   onBuyinChange(changedBuyin: String) {
      let buyin = this.buyins[this.buyins.findIndex(e => e.level === changedBuyin)];
      buyin.checked = !buyin.checked;
   }

   onSpeedChange(changedSpeed: String) {
      let speed = this.speeds[this.speeds.findIndex(e => e.name === changedSpeed)];
      speed.checked = !speed.checked;
   }

}
