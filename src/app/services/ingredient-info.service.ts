import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IngredientAdditionalInfoClass } from '../entity/ingredient.additional-info.class';

@Injectable({
  providedIn: 'root',
})
export class IngredientInfoService {

  private ADDITIONAL_INFO_COLLECTION = 'ingredients-additional-info';

  constructor(private db: AngularFirestore) {
  }

  getInfoById(id: number): Promise<AngularFirestoreCollection> {
    return new Promise<any>((resolve) => {
      const collection = this.db.collection(this.ADDITIONAL_INFO_COLLECTION, ref => ref.where('id', '==', id));
      resolve(collection);
    });
  }
}
