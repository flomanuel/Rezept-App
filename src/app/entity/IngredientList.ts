import {Ingredient} from './ingredient.class';
import {Title} from './title.class';

export class IngredientList {
  public ingredients?: Ingredient[] = [];
  private _title: Title;

  constructor(public title: Title) {
    this._title = title;
  }

  push(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
