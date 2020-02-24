import {Ingredient} from './ingredient.class';

export class IngredientList {
  public ingredients?: Ingredient[] = [];
  private _title: string;

  constructor(public title: string) {
    this._title = title;
  }

  push(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
