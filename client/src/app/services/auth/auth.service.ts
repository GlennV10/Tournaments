import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private api: String = 'http://localhost:3000';   
   private loggedIn: Boolean = false;

   constructor(
      private http: HttpClient
   ) { }

   /* Register User */
   registerUser(user: Object): Observable<Object> {
      return this.http.post<Object>(`${this.api}/api/auth/register`, user, { withCredentials: true });
   }

   /* Login User */
   loginUser(username: String, password: String): Observable<Object> {
      const user = { username, password };
      return this.http.post<Object>(`${this.api}/api/auth/login`, user, { withCredentials: true });
   }

   /* Logout User */
   logoutUser(): Observable<Object> {
      return this.http.post<Object>(`${this.api}/api/auth/logout`, {}, { withCredentials: true });
   }

   /* Get User Status */
   getUserStatus(): Observable<boolean> {
      return this.http.get<boolean>(`${this.api}/api/auth/status`, { withCredentials: true });
   }

   isLoggedIn(): Boolean {
      return this.loggedIn;
   }

   setLoggedIn(value: Boolean): void {
      this.loggedIn = value;
   }

}
