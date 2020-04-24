import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../entity/recipe';

@Component({
  selector: 'app-recipe-list-element',
  templateUrl: './recipe-list-element.component.html',
  styleUrls: ['./recipe-list-element.component.less'],
})
export class RecipeListElementComponent implements OnInit {
  @Input() recipe: Recipe;

  private fallbackImagePath = '../../../../assets/objects/fallbackImage.svg';

  constructor() {
  }

  ngOnInit() {
  }

  countMissingIngredients(): number {
    return 5;
  }

  calculatePreparationTime(time: number): number[] {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return [hours, minutes];
  }
}
