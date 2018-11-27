import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent} from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TournamentComponent} from './components/tournament/tournament.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ResultsComponent } from './components/results/results.component';
import { SessionComponent } from './components/session/session.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

const appRoutes: Routes = [
   { path: '', component: HomeComponent, canActivate:[NotAuthGuard]},
   { path: 'register', component: RegisterComponent, canActivate:[NotAuthGuard]},
   { path: 'login', component: LoginComponent, canActivate:[NotAuthGuard]},
   { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
   { path: 'tournaments', component: TournamentsComponent, canActivate:[AuthGuard] },
   { path: 'tournaments/:id', component: TournamentComponent, canActivate:[AuthGuard] },
   { path: 'schedule', component: ScheduleComponent, canActivate:[AuthGuard] },
   { path: 'results', component: ResultsComponent, canActivate:[AuthGuard] },
   { path: 'session', component: SessionComponent, canActivate:[AuthGuard] }
]

@NgModule({
   declarations: [],
   imports: [RouterModule.forRoot(appRoutes)],
   providers: [AuthGuard, NotAuthGuard],
   bootstrap: [],
   exports: [RouterModule]
})

export class AppRoutingModule { }