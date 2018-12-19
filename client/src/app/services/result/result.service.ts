import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../../shared/models/results/result.model';

@Injectable({
   providedIn: 'root'
})
export class ResultService {
   private api: String = 'http://localhost:3000';

   constructor(
      private http: HttpClient
   ) { }

   /* Get User Results */
   getResults(): Observable<Result[]> {
      return this.http.get<Result[]>(`${this.api}/api/results`, { withCredentials: true });
   }

   /* Get User Results by Status */
   getResultsByStatus(status: String): Observable<Result[]> {
      return this.http.get<Result[]>(`${this.api}/api/results/${status}`, { withCredentials: true});
   }

   /* Add Result */
   addResult(tournamentId: String): Observable<Object> {
      const result = { id: tournamentId };
      return this.http.post<Object>(`${this.api}/api/results`, result, { withCredentials: true });
   }

   /* Update Result */
   updateResult(resultId: String, body: Object): Observable<Object> {
      return this.http.post<Object>(`${this.api}/api/results/${resultId}`, body, { withCredentials: true });
   }
}
