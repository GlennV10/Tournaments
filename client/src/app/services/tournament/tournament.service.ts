import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tournament } from '../../shared/models/tournaments/tournament.model';

@Injectable({
   providedIn: 'root'
})
export class TournamentService {
   private api: String = 'http://localhost:3000';

   constructor(
      private http: HttpClient
   ) { }

   /* Get Tournament by ID */
   getTournament(id: String): Observable<Tournament> {
      return this.http.get<Tournament>(`${this.api}/api/tournaments/${id}`);
   }

   /* Get ALL Tournament */
   getTournaments(): Observable<Tournament[]> {
      return this.http.get<Tournament[]>(`${this.api}/api/tournaments`);
   }

   /* Get Tournaments starting soon */
   getStartingTournaments(): Observable<Tournament[]> {
      return this.http.get<Tournament[]>(`${this.api}/api/tournaments/starting`);
   }
}
