import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../entity/recipe';
import { categories, FireBaseQueryResult, regions } from '../types';
import { Category } from '../entity/category.class';
import { Image } from '../entity/image.class';
import { Instructions } from '../entity/instructions.class';
import { Region } from '../entity/region.class';
import { Title } from '../entity/title.class';
import { Video } from '../entity/video.class';
import { Id } from '../entity/id.class';
import { PreparationTime } from '../entity/preparation-time.class';
import { Ingredient } from '../entity/ingredient.class';

@Injectable({
  providedIn: 'root',
})
export class RecipeFirebaseService {
  private readonly path = '/recipes';

  constructor(private readonly db: AngularFirestore) {
  }

  collection(): Observable<any[]> {
    return this.db.collection(this.path).valueChanges();
  }

  recipes(): Promise<Recipe[]> {
    const recipes = [];
    return new Promise<Recipe[]>((resolve => {
      // @ts-ignore
      this.collection().forEach((firebaseResults: FireBaseQueryResult[]) => {
        firebaseResults.forEach(firebaseResult => {
          const id = Id.fromNumber(Id.generate());
          const preparationTime = PreparationTime.create(parseInt(firebaseResult.preparationTime, 10));
          const mappedCategories: Category[] = firebaseResult.categories.map(category => Category.create(categories[category]));
          const mappedRegions = firebaseResult.region.map(region => Region.create(regions[region]));
          const images: Image[] = firebaseResult.images.map(image => Image.create(image));
          const ingredients = this.extractIngredients(firebaseResult);
          const instructions = Instructions.create(firebaseResult.instructions);
          const title = Title.create(firebaseResult.title);
          const video = Video.create(firebaseResult.video);

          recipes.push(new Recipe(
            id,
            title,
            preparationTime,
            mappedCategories,
            mappedRegions,
            ingredients,
            instructions,
            images,
            video,
          ));
        });
      });
      resolve(recipes);
    }));
  }

  private extractIngredients(fireBaseQueryResult: FireBaseQueryResult): Ingredient[] {
    if (!fireBaseQueryResult.ingredients) {
      return [];
    }

    const ingredients = [];
    const ingredientNames = Object.keys(fireBaseQueryResult.ingredients);

    ingredientNames.forEach(ingredientName => {
      const fireBaseIngredient = fireBaseQueryResult.ingredients[ingredientName];
      const additionalInfo = fireBaseIngredient.additionalInfo;
      // @ts-ignore splits from "1 Tasse" to ["1", "Tasse"]
      const [amount, suffix] = fireBaseIngredient.amount.split(' ');

      ingredients.push(new Ingredient(
        ingredientName,
        amount,
        suffix,
        additionalInfo,
      ));
    });

    return ingredients;
  }
}
