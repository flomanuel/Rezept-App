import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Database } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class IngredientInfoService {

  constructor(private db: AngularFirestore) {
  }

  getInfoById(id: number): Promise<AngularFirestoreCollection> {
    return new Promise<any>((resolve) => {
      const collection = this.db.collection(Database.ADDITIONAL_INFO, ref => ref.where('id', '==', id));
      resolve(collection);
    });
  }
}
