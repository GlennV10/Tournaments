import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ResultsComponent } from './components/results/results.component';
import { SessionComponent } from './components/session/session.component';

const appRoutes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'tournaments', component: TournamentsComponent },
   { path: 'schedule', component: ScheduleComponent },
   { path: 'results', component: ResultsComponent },
   { path: 'session', component: SessionComponent }
]

@NgModule({
   declarations: [],
   imports: [RouterModule.forRoot(appRoutes)],
   providers: [],
   bootstrap: [],
   exports: [RouterModule]
})

export class AppRoutingModule { }