import { Tag } from './Tag';
import { Title } from './title.class';
import { PreparationTime } from './preparation-time.class';
import { Instructions } from './instructions.class';
import { Ingredient } from './ingredient.class';
import { Id } from './id.class';
import { Category } from './category.class';
import { Image } from './image.class';
import { Video } from './video.class';
import { Region } from './region.class';

export class Recipe extends Tag {
  public missingIngredients: number;

  constructor(public id: Id,
              public title: Title,
              public preparationTime: PreparationTime,
              public category: Category[],
              public region: Region[],
              public ingredients: Ingredient[],
              public instructions: Instructions,
              public images: Image[],
              public video: Video,
  ) {
    super(title, id);
  }
}
