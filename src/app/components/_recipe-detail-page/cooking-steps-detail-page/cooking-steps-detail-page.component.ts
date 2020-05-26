import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../entity/recipe';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../../../services/time.service';
import { PreparationTime } from '../../../types';

@Component({
  selector: 'app-cooking-steps-detail-page',
  templateUrl: './cooking-steps-detail-page.component.html',
  styleUrls: ['./cooking-steps-detail-page.component.less'],
})
export class CookingStepsDetailPageComponent implements OnInit {

  private recipe: Recipe;

  constructor(private route: ActivatedRoute, private readonly timeService: TimeService) {
    this.route.queryParams.subscribe(params => {
      this.recipe = JSON.parse(params.recipe);
    });
  }

  ngOnInit() {
  }

  calculatePreparationTime(format: string): PreparationTime|number {
    return this.timeService.calculatePreparationTime(this.recipe.preparationTime, format);
  }
}
