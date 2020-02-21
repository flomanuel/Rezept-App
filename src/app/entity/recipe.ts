import { Title } from './title.class';
import { PreparationTime } from './preparation-time.class';
import { Instructions } from './instructions.class';
import { Ingredient } from './ingredient.class';
import { Id } from './id.class';
import { Category } from './category.class';
import { Image } from './image.class';
import { Video } from './video.class';
import { Region } from './region.class';
import { RecipeStep } from './RecipeStep';

export interface Recipe {
  missingIngredients: number;
  id: Id;
  title: Title;
  preparationTime: PreparationTime;
  category: Category[];
  region: Region[];
  ingredients: Ingredient[];
  instructions: Instructions;
  images: Image[];
  video: Video;
  uid: number;
  steps: RecipeStep[];
}
