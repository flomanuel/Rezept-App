import { Component } from '@angular/core';
import { Ingredient } from '../../entity/ingredient.class';
import { Category } from '../../entity/category.enum';
import { Region } from '../../entity/region.enum';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less'],
})
export class RecipeComponent {
  private fileCategories = Object.values(Category);
  private fileRegions = Object.values(Region);

  public title: string;
  public description: string;
  public region: string;
  public category: string;

  constructor() {
  }

  changeIngredients(ingredients: Ingredient[]): void {
    console.log(ingredients);
    // this.ingredients.push(ingredients);
  }
}
