import { Component, OnInit } from '@angular/core';

import { Result } from '../../shared/models/results/result.model';

import { ResultService } from '../../services/result/result.service';

@Component({
   selector: 'app-results',
   templateUrl: './results.component.html',
   styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
   private results: Result[];

   constructor(
      private resultService: ResultService
   ) { }

   ngOnInit() {
      this.getResults();
   }

   getResults() {
      this.resultService.getResultsByStatus('finished')
         .subscribe(results => {
            this.results = results;
         });
   }

}
