import { Pipe, PipeTransform } from '@angular/core';

import { Tournament } from '../models/tournaments/tournament.model';

@Pipe({
   name: 'filterBuyin',
   pure: false
})
export class BuyinFilterPipe implements PipeTransform {
   transform(tournaments: Tournament[], minBuyin: Number, maxBuyin: Number): Tournament[] {
      return tournaments.filter(tournament => {
         return tournament.buyin.total >= minBuyin["level"] && tournament.buyin.total <= maxBuyin["level"];
      });
   }
}