import { Component, OnInit } from '@angular/core';

import { Tournament } from '../../shared/models/tournaments/tournament.model';
import { Days } from '../../shared/data/days.data';

import { UserService } from '../../services/user/user.service';

@Component({
   selector: 'app-schedule',
   templateUrl: './schedule.component.html',
   styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
   private schedule: Tournament[];
   private weeklySchedule: Object[];
   private today: Number;
   private selectedDay: String;

   constructor(
      private userService: UserService
   ) { }

   ngOnInit() {
      this.today = Date.now();
      this.selectedDay = Days[new Date().getDay()];
      this.getWeeklySchedule();
   }

   getWeeklySchedule(): void {
      this.userService.getWeeklySchedule()
         .subscribe(weeklySchedule => {
            this.weeklySchedule = weeklySchedule;
            this.getSchedule();
         });
   }

   getSchedule(): void {
      const weekday = this.weeklySchedule.find(weekday => {
         return weekday['day'] === this.selectedDay;
      });
      this.schedule = weekday['tournaments'];
   }

   deleteTournamentFromSchedule(tournamentId: String): void {
      this.userService.deleteTournamentFromSchedule(tournamentId)
         .subscribe(res => { 
            this.getWeeklySchedule(); 
         });
   }

   selectDay(day: String): void {
      this.selectedDay = day;
      this.getSchedule();
   }

}
