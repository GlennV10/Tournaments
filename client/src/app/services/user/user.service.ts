import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tournament } from '../../shared/models/tournaments/tournament.model';

@Injectable({
   providedIn: 'root'
})
export class UserService {
   private api: String = 'http://localhost:3000';

   constructor(
      private http: HttpClient
   ) { }

   /* Get User Schedule */
   getSchedule(): Observable<Tournament[]> {
      return this.http.get<Tournament[]>(`${this.api}/api/users/schedule`, { withCredentials: true });
   }

   /* Get User Weekly Schedule */
   getWeeklySchedule(): Observable<Object[]> {
      return this.http.get<Object[]>(`${this.api}/api/users/schedule/weekly`, { withCredentials: true });
   }

   /* Get User Scheduled Tournaments Running now */
   getUserScheduleNow(): Observable<Tournament[]> {
      return this.http.get<Tournament[]>(`${this.api}/api/users/schedule/now`, { withCredentials: true });
   }

   /* Add Tournament to Schedule */
   addTournamentToSchedule(tournamentId: String): Observable<Object> {      
      const tournament = { id: tournamentId };
      return this.http.post<Object>(`${this.api}/api/users/schedule`, tournament, { withCredentials: true });
   }

   /* Delete Tournament from Schedule */
   deleteTournamentFromSchedule(tournamentId: String): Observable<Object> {
      return this.http.delete<Object>(`${this.api}/api/users/schedule/${tournamentId}`, { withCredentials: true});
   }
}
