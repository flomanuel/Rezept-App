import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Database } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class RecipeFirebaseService {

  constructor(private readonly db: AngularFirestore) {
  }

  collection(): Promise<AngularFirestoreCollection> {
    return new Promise<any>((resolve) => {
      const recipes = this.db.collection(Database.RECIPES).valueChanges();
      resolve(recipes);
    });
  }
}
