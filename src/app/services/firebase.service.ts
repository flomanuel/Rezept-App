import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Database } from '../../config';
import { AngularFireAuth } from '@angular/fire/auth';
import { Recipe } from '../entity/recipe';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  constructor(private readonly db: AngularFirestore, private readonly dbAuth: AngularFireAuth) {
  }

  async getRecipeWithId(id: number): Promise<AngularFirestoreCollection<Recipe>> {
    await this.dbAuth.auth.signInAnonymously().catch(err => {
      if (err) {
        throw err;
      }
    });
    return this.db.collection(Database.RECIPES, ref => ref.where('id', '==', id));
  }

  collection(): Promise<AngularFirestoreCollection> {
    return new Promise<any>((resolve) => {
      const recipes = this.db.collection(Database.RECIPES).valueChanges();
      resolve(recipes);
    });
  }
}
