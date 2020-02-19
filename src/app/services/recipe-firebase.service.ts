import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FireBaseQueryResult } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RecipeFirebaseService {
  private readonly path = '/recipes';

  constructor(private readonly db: AngularFirestore) {
  }

  collection(): Observable<FireBaseQueryResult[]> {
    // @ts-ignore
    return this.db.collection(this.path).valueChanges();
  }
}
