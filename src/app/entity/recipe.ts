import { Title } from './title.class';
import { Ingredient } from './ingredient.class';
import { Id } from './id.class';
import { Category } from './category.class';
import { Image } from './image.class';
import { Video } from './video.class';
import { Region } from './region.class';
import { RecipeStep } from './RecipeStep';

export class Recipe {
  public missingIngredients: number;

  constructor(id: Id,
              public title: Title,
              public preparationTime: number,
              public category: Category[],
              public region: Region[],
              public ingredients: Ingredient[],
              public instructions: string,
              public images: Image[],
              public video: Video,
              public allergens?: string[],
              public uid?: number,
              public steps?: RecipeStep[],
              public tools?: string[],
  ) {
  }
}
