import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Tournament } from '../../shared/models/tournaments/tournament.model';
import { Days } from '../../shared/data/days.data'; 

import { TournamentService } from '../../services/tournament/tournament.service';

@Component({
   selector: 'app-tournament',
   templateUrl: './tournament.component.html',
   styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
   private tournament: Tournament;
   private today: Number;
   private days: Object[] = Days;

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private tournamentService: TournamentService
   ) { }

   ngOnInit() {      
      this.activatedRoute.params.subscribe(params => {
         this.getTournament(params.id);
      });

      this.today = Date.now();
   }

   getTournament(id: String): void {
      this.tournamentService.getTournament(id)
         .subscribe(tournament => {
            this.tournament = tournament;
         });
   }

}
