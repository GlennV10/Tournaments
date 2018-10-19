import { Pipe, PipeTransform } from '@angular/core';

import { Tournament } from '../models/tournaments/tournament.model';

@Pipe({
   name: 'filterSpeed',
   pure: false
})
export class SpeedFilterPipe implements PipeTransform {
   transform(tournaments: Tournament[], speeds: Object[]): Tournament[] {
      let filteredSpeeds = speeds.filter(speed => speed["checked"]);
      let checkedSpeeds = filteredSpeeds.map(speed => speed["name"]);
      return tournaments.filter(tournament => {
         return checkedSpeeds.includes(tournament.speed);
      });
   }
}