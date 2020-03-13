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
  private removeMessage = '';
  private recipeToRemove: Recipe;
  private wantsToRemove = false;
  localStorageKeys: any = localStorageKeys;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.getFavoredRecipesFromFirebase();
  }

  searchFavorites(): void {
    this.filteredRecipes = this.favoriteRecipes.filter(recipe => recipe.title.toLowerCase().includes(this.searchStr.toLowerCase()));
  }

  private getFavoredRecipesFromFirebase(): void {
    const favoredRecipeIds = this.localStorageService.getItem(localStorageKeys.FAVORITE_RECIPES);

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

  setRemoveMessageAndOpenModal(recipe: Recipe): void {
    this.recipeToRemove = recipe;
    this.removeMessage = `Sind Sie sicher dass Sie das Rezept "${recipe.title}" aus Ihren Favoriten entfernen möchten?`;
    this.wantsToRemove = true;
  }

  onRemove(willRemove: boolean): void {
    if (willRemove) {
      this.favoriteRecipes = this.favoriteRecipes.filter(recipe => recipe.id !== this.recipeToRemove.id);
      if (this.favoriteRecipes.length === 0) {
        this.localStorageService.removeItem(localStorageKeys.FAVORITE_RECIPES);
      } else {
        this.localStorageService.setItem(localStorageKeys.FAVORITE_RECIPES, this.favoriteRecipes.map(recipe => recipe.id));
      }
    }

    this.wantsToRemove = false;
  }
}
