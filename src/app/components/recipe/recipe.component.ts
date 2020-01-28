import { Component } from '@angular/core';
import { Recipe } from '../../Entity/recipe.class';
import { Ingredient } from '../../Entity/ingredient.class';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less'],
})
export class RecipeComponent {
  private recipe: Recipe = new Recipe();
  description: string;

  constructor() {
  }

  set title(newTitle: string) {
    this.recipe.title = newTitle;
  }

  get title(): string {
    return this.recipe.title;
  }

  changeIngredients(ingredients: Ingredient[]): void {
    console.log(ingredients);
    // this.ingredients.push(ingredients);
  }
}
