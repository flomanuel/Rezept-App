import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Database, DatabaseFields } from '../../config';
import { AngularFireAuth } from '@angular/fire/auth';
import { Recipe } from '../entity/recipe';
import { RecipeIdListTypes } from '../types';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  public activeSearch = false;
  public searchResult: Recipe[] = [];
  public regionIds: number[] = [];
  public categoryIds: number[] = [];

  constructor(private readonly db: AngularFirestore, private readonly dbAuth: AngularFireAuth) {
  }

  async authenticateAnonymousUser() {
    await this.dbAuth.auth.signInAnonymously().catch(err => {
      if (err) {
        throw err;
      }
    });
  }

  async getRecipeWithId(id: number): Promise<AngularFirestoreCollection<Recipe>> {
    return this.db.collection(Database.RECIPES, ref => ref.where(DatabaseFields.ID, '==', id));
  }

  async searchRecipesByIngredients(ingredientIds: number[]): Promise<AngularFirestoreCollection<Recipe>> {
    return this.db.collection(Database.RECIPES, ref => ref.where(
      DatabaseFields.INGREDIENTS_ID_LIST, 'array-contains-any', ingredientIds,
    ));
  }

  collection(): Promise<AngularFirestoreCollection> {
    return new Promise<any>((resolve) => {
      const recipes = this.db.collection(Database.RECIPES).valueChanges();
      resolve(recipes);
    });
  }

  public searchRecipesByParams(ingredientIds) {
    this.activeSearch = true;
    if (ingredientIds.length > 0) {

      const filteredIngredientIds = ingredientIds.reduce((result: number[], currentValue: number) => {
        return result.includes(currentValue) ? result : [...result, currentValue];
      }, []);

      this.searchRecipesByIngredients(filteredIngredientIds).then((collection) => {
          collection.valueChanges().subscribe((recipes: Recipe[]) => {
              if (filteredIngredientIds.length > 1) {
                this.filterSearchResultByIdList(filteredIngredientIds, 'ingredients', recipes);
              } else {
                this.searchResult = recipes;
              }

              if (this.regionIds.length > 0) {
                this.filterSearchResultByIdList(this.regionIds, 'regions', this.searchResult);
              }

              if (this.categoryIds.length > 0) {
                this.filterSearchResultByIdList(this.categoryIds, 'categories', this.searchResult);
              }
              this.activeSearch = false;
            },
          );
        },
      );
    } else {
      this.searchResult = [];
      this.activeSearch = false;
    }
  }

  /* todo: replace &&-filtering for regions with ||-filtering for regions.
      Since in my opinion it makes more sense to search for german OR italian soups instead of german-italian soups. */
  public filterSearchResultByIdList(filteredIds: number[], type: RecipeIdListTypes, recipes: Recipe[] = this.searchResult) {
    this.searchResult = recipes.reduce((result: Recipe[], currentRecipe: Recipe) => {
      let idList: number[];
      switch (type) {
        case 'ingredients':
          idList = currentRecipe.ingredientsIdList;
          break;
        case 'regions':
          idList = currentRecipe.region;
          break;
        case 'categories':
          idList = currentRecipe.category;
          break;
        default:
          idList = [];
      }

      let allFilteredIdsInRecipe = true;
      filteredIds.forEach((idFromIdList) => {
        if (typeof idFromIdList === 'string') {
          idFromIdList = parseInt(idFromIdList, 10);
        }
        if (!idList.includes(idFromIdList)) {
          allFilteredIdsInRecipe = false;
        }
      });

      if (allFilteredIdsInRecipe) {
        return [...result, currentRecipe];
      } else {
        return result;
      }
    }, []);
  }
}
