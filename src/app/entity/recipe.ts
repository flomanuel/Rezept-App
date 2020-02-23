import { Ingredient } from './ingredient.class';
import { RecipeStep } from './RecipeStep';

export class Recipe {
  public missingIngredients: number;

  constructor(public id: number,
              public title: string,
              public preparationTime: number,
              public category: number[],
              public region: number[],
              public ingredients: Ingredient[],
              public instructions: string,
              public images: string[],
              public video: string,
              public allergens?: string[],
              public steps?: RecipeStep[],
              public tools?: string[],
  ) {
  }
}
