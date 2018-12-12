import { Component, OnInit } from '@angular/core';

import { Tournament } from '../../shared/models/tournaments/tournament.model';

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

   constructor(
      private userService: UserService
   ) { }

   ngOnInit() {
      this.getSchedule();
      this.getWeeklySchedule();
      this.today = Date.now();
   }

   getSchedule(): void {
      this.userService.getSchedule()
         .subscribe(schedule => {
            this.schedule = schedule;
         });
   }

   getWeeklySchedule(): void {
      this.userService.getWeeklySchedule()
         .subscribe(weeklySchedule => {
            console.log(weeklySchedule);
            this.weeklySchedule = weeklySchedule;
         });
   }

}
