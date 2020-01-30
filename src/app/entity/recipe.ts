import { Category } from './category.enum';
import { Region } from './region.enum';
import { Ingredient } from './Ingredient';
import { Tag } from './Tag';

export class Recipe extends Tag {
  public missingIngredients: number;

  constructor(public ID: number, public title: string, public preparationTime: number, public category: Category[],
              public region: Region[], public ingredients: Ingredient[], public instructions: string, public image: string) {
    super(title, ID);
  }

  public add_missing(): void {
    this.missingIngredients++;
  }
}
