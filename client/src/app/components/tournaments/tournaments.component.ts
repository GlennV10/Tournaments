import { Component, OnInit } from '@angular/core';

import { Tournament } from '../../shared/models/tournaments/tournament.model';
import { Buyins } from '../../shared/data/buyins.data';
import { Speeds } from '../../shared/data/speeds.data';

import { TournamentService } from '../../services/tournament/tournament.service';

import { BuyinFilterPipe } from '../../shared/pipes/buyin-filter.pipe';
import { SpeedFilterPipe } from '../../shared/pipes/speed-filter.pipe';

@Component({
   selector: 'app-tournaments',
   templateUrl: './tournaments.component.html',
   styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
   private tournaments: Tournament[];
   private startingTournaments: Tournament[];
   private buyins: Object[] = Buyins;
   private speeds: Object[] = Speeds;
   private minBuyin: Object = this.buyins[0];
   private maxBuyin: Object = this.buyins[23];

   constructor(
      private tournamentService: TournamentService,
      private filterBuyin: BuyinFilterPipe,
      private filterSpeed: SpeedFilterPipe
   ) { }

   ngOnInit() {
      this.getTournaments();
      this.getStartingTournaments();
   }

   getTournaments(): void {
      this.tournamentService.getTournaments()
         .subscribe(tournaments => {
            this.tournaments = tournaments
            console.log(tournaments);
         });
   }

   getStartingTournaments(): void {
      this.tournamentService.getStartingTournaments()
         .subscribe(startingTournaments => {
            this.startingTournaments = startingTournaments;
         });
   }

   onMinBuyinChange(event: Event) {
      let value = event.target["value"];
      if (this.maxBuyin["step"] < value) this.maxBuyin = this.buyins[value];
      this.minBuyin = this.buyins[value];
   }

   onMaxBuyinChange(event: Event) {  
      let value = event.target["value"];    
      if (this.minBuyin["step"] > value) this.minBuyin = this.buyins[value];
      this.maxBuyin = this.buyins[value];
   }

   onSpeedChange(changedSpeed: String) {
      let speed = this.speeds[this.speeds.findIndex(e => e["name"] === changedSpeed)];
      speed["checked"] = !speed["checked"];
   }

}
