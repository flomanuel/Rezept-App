import { Component } from '@angular/core';
import { Ingredient } from '../../entity/ingredient.class';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less'],
})
export class RecipeComponent {
  description: string;

  constructor() {
  }

  changeIngredients(ingredients: Ingredient[]): void {
    console.log(ingredients);
    // this.ingredients.push(ingredients);
  }
}
