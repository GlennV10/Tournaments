import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SessionComponent } from './components/session/session.component';
import { ResultsComponent } from './components/results/results.component';

import { TournamentService } from './services/tournament/tournament.service';

import { BuyinFilterPipe } from './shared/pipes/buyin-filter.pipe';
import { SpeedFilterPipe } from './shared/pipes/speed-filter.pipe';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
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
   providers: [TournamentService, BuyinFilterPipe, SpeedFilterPipe],
   bootstrap: [AppComponent]
})
export class AppModule { }
