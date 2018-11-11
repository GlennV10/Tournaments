import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Tournament } from '../../shared/models/tournaments/tournament.model';
import { TournamentService } from '../../services/tournament/tournament.service';

@Component({
   selector: 'app-tournament',
   templateUrl: './tournament.component.html',
   styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
   tournament: Tournament;

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private tournamentService: TournamentService
   ) { }

   ngOnInit() {      
      this.activatedRoute.params.subscribe(params => {
         this.getTournament(params.id);
      });
   }

   getTournament(id: String): void {
      this.tournamentService.getTournament(id)
         .subscribe(tournament => {
            this.tournament = tournament;
            console.log(tournament);
         });
   }

}
