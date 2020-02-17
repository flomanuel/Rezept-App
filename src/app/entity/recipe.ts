import { Category } from './category.enum';
import { Tag } from './Tag';
import { Title } from './title.class';
import { PreparationTime } from './preparation-time.class';
import { Instructions } from './instructions.class';
import { Region } from './region.enum';
import { Ingredient } from './ingredient.class';
import { Id } from './id.class';

export class Recipe extends Tag {
  public missingIngredients: number;

  constructor(public id: Id, public title: Title, public preparationTime: PreparationTime, public category: Category[],
              public region: Region[], public ingredients: Ingredient[], public instructions: Instructions, public image: string) {
    super(title, id);
  }


  public add_missing(): void {
    this.missingIngredients++;
  }
}
