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

   constructor(
      private userService: UserService
   ) { }

   ngOnInit() {
      this.getSchedule();
   }

   getSchedule(): void {
      this.userService.getSchedule()
         .subscribe(schedule => {
            this.schedule = schedule;
         });
   }

}
