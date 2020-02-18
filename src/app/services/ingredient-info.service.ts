import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientInfoService {

  private ADDITIONAL_INFO_COLLECTION = 'ingredients-additional-info';

  constructor(private db: AngularFirestore) {
  }

  getInfoById(id: number): Promise<any> {
    return new Promise<any>((resolve) => {
      this.db.collection(
        this.ADDITIONAL_INFO_COLLECTION, ref => ref.where('id', '==', id),
      ).valueChanges().subscribe((snapshots: any[]) => {
        resolve(snapshots);
      });
    });
  }
}
