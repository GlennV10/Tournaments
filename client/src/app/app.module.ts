import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SessionComponent } from './components/session/session.component';
import { ResultsComponent } from './components/results/results.component';

import { AuthService } from './services/auth/auth.service';
import { TournamentService } from './services/tournament/tournament.service';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

import { SessionInterceptor } from './services/auth/session.interceptor';

import { BuyinFilterPipe } from './shared/pipes/buyin-filter.pipe';
import { SpeedFilterPipe } from './shared/pipes/speed-filter.pipe';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      DashboardComponent,
      TournamentComponent,
      TournamentsComponent,
      ScheduleComponent,
      SessionComponent,
      ResultsComponent,
      BuyinFilterPipe,
      SpeedFilterPipe
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [
      { 
         provide: HTTP_INTERCEPTORS, 
         useClass: SessionInterceptor, 
         multi: true 
      },
      // { 
      //    provide: APP_INITIALIZER, 
      //    useFactory: 
      //       (authService: AuthService) => 
      //          function() { 
      //             authService.getUserStatus().subscribe(isLoggedIn => {
      //                authService.loggedIn.next(isLoggedIn);
      //             });
      //          },
      //    deps: [AuthService],
      //    multi: true
      // },
      AuthService, TournamentService, AuthGuard, NotAuthGuard, BuyinFilterPipe, SpeedFilterPipe],
   bootstrap: [AppComponent]
})
export class AppModule { }
