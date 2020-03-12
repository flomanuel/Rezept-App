import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Database, DatabaseFields } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class IngredientInfoService {

  constructor(private db: AngularFirestore) {
  }

  getInfoById(id: number): Promise<AngularFirestoreCollection> {
    return new Promise<any>((resolve) => {
      const collection = this.db.collection(Database.ADDITIONAL_INFO, ref => ref.where(
        DatabaseFields.INGREDIENT_ADDITIONAL_INFO___ID, '==', id));
      resolve(collection);
    });
  }
}
