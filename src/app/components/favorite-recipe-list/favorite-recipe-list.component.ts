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
  private favoriteRecipes: Recipe[] = [];
  private searchStr = '';
  private filteredRecipes: Recipe[] = [];

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.getFavoredRecipesFromFirebase();
  }

  searchFavorites(): void {
    this.filteredRecipes = this.favoriteRecipes.filter(recipe => recipe.title.includes(this.searchStr));
  }

  private getFavoredRecipesFromFirebase(): void {
    const favoredRecipeIds = this.localStorageService.getItem(localStorageKeys.FAVOURITE_RECIPES);

    if (favoredRecipeIds.length > 0) {
      favoredRecipeIds.forEach(id => {
        this.firebaseService.getRecipeWithId(id).then(collection => {
          collection.valueChanges().subscribe((snapshot: Recipe[]) => {
            if (!this.favoriteRecipes.includes(snapshot[0])) {
              this.favoriteRecipes.push(snapshot[0]);
            }
          });
        });
      });
    }
  }
}
