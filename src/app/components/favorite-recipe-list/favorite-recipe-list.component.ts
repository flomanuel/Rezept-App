import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { FirebaseService } from '../../services/firebase.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { localStorageKeys } from '../../../config';

@Component({
  selector: 'app-favorite-recipe-list',
  templateUrl: './favorite-recipe-list.component.html',
  styleUrls: ['./favorite-recipe-list.component.less'],
})
export class FavoriteRecipeListComponent implements OnInit {
  private favoriteRecipes: Recipe[];

  constructor(private readonly firebaseService: FirebaseService, private readonly localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.getFavoredRecipesFromFirebase();
  }

  private getFavoredRecipesFromFirebase(): void {
    const favoredRecipeIds = this.localStorageService.getItem(localStorageKeys.FAVOURITE_RECIPES);
    favoredRecipeIds.forEach(id => {
      this.firebaseService.getRecipeWithId(id).then(collection => {
        collection.valueChanges().subscribe((snapshot: Recipe[]) => {
          console.log(snapshot);
          this.favoriteRecipes = snapshot;
        });
      });
    });
  }
}
