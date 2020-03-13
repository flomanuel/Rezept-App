import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Database, DatabaseFields } from '../../config';
import { AngularFireAuth } from '@angular/fire/auth';
import { Recipe } from '../entity/recipe';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

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
}
