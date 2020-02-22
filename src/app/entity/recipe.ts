import { Tag } from './Tag';
import { Title } from './title.class';
import { Instructions } from './instructions.class';
import { Ingredient } from './ingredient.class';
import { Id } from './id.class';
import { Category } from './category.class';
import { Image } from './image.class';
import { Video } from './video.class';
import { Region } from './region.class';
import { RecipeStep } from './RecipeStep';

export class Recipe extends Tag {
  public missingIngredients: number;

  constructor(id: Id,
              title: Title,
              public preparationTime: number,
              public category: Category[],
              public region: Region[],
              public ingredients: Ingredient[],
              public instructions: Instructions,
              public images: Image[],
              public video: Video,
              public allergens?: string[],
              public uid?: number,
              public steps?: RecipeStep[],
  ) {
    super(title, id);
  }
}
