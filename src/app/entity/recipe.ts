import { Category } from './category.enum';
import { Region } from './region.enum';
import { Ingredient } from './ingredient.class';

export class Recipe {
  public missingIngredients: number;

  constructor(public ID: number,
              public title: string,
              public preparationTime: number,
              public category: Category[],
              public region: Region[],
              public ingredients: Ingredient[],
              public instructions: string,
              public image: string) {
  }

  public add_missing(): void {
    this.missingIngredients++;
  }
}
