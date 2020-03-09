import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../entity/recipe';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-cooking-steps-detail-page',
  templateUrl: './cooking-steps-detail-page.component.html',
  styleUrls: ['./cooking-steps-detail-page.component.less'],
})
export class CookingStepsDetailPageComponent implements OnInit {

  private recipe: Recipe;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.recipe = JSON.parse(params.recipe);
    });
  }

  ngOnInit() {
  }

  calculatePreparationTime(format: string) {
    const time = this.recipe.preparationTime;
    if (format === 'h') {
      return Math.trunc(time / 60);
    }

    if (format === 'm') {
      return time % 60;
    }
  }

}
