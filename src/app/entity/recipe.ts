import { Category } from './category.enum';
import { Ingrediant } from './ingrediant';
import { Region } from './region.enum';

export class Recipe {
  public missingIngredients: number;

  constructor(public ID: number, public title: string, public preparationTime: number, public category: Category[], public region: Region[], public ingredients: Ingrediant[], public instructions: string, public image: string) {
  }

  public add_missing(): void {
    this.missingIngredients++;
  }
}
