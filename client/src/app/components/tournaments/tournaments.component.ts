import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tournament } from '../../shared/models/tournaments/tournament.model';
import { Buyins } from '../../shared/data/buyins.data';
import { Speeds } from '../../shared/data/speeds.data';

import { TournamentService } from '../../services/tournament/tournament.service';
import { UserService } from '../../services/user/user.service';

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
   private userSchedule: Tournament[];
   private buyins: Object[] = Buyins;
   private speeds: Object[] = Speeds;
   private minBuyin: Object = this.buyins[0];
   private maxBuyin: Object = this.buyins[23];

   constructor(
      private tournamentService: TournamentService,
      private userService: UserService,
      private router: Router,
      private filterBuyin: BuyinFilterPipe,
      private filterSpeed: SpeedFilterPipe
   ) { }

   ngOnInit() {
      this.getTournaments();
      this.getStartingTournaments();
      this.getUserSchedule();
   }

   getTournaments(): void {
      this.tournamentService.getTournaments()
         .subscribe(tournaments => {
            this.tournaments = tournaments
         });
   }

   getStartingTournaments(): void {
      this.tournamentService.getStartingTournaments()
         .subscribe(startingTournaments => {
            this.startingTournaments = startingTournaments;
         });
   }

   getUserSchedule(): void {
      this.userService.getSchedule()
         .subscribe(schedule => {
            this.userSchedule = schedule;
         });
   }

   addTournamentToSchedule(tournamentId: String): void {
      this.userService.addTournamentToSchedule(tournamentId)
         .subscribe(res => { this.getUserSchedule(); });
   }

   deleteTournamentFromSchedule(tournamentId: String): void {
      this.userService.deleteTournamentFromSchedule(tournamentId)
         .subscribe(res => { this.getUserSchedule(); });
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

   includes(tournament: Tournament) {
      return this.userSchedule.some(scheduledTournament => {
         return JSON.stringify(scheduledTournament) === JSON.stringify(tournament);
      });
   }

}
