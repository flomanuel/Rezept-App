import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { localStorageKeys } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class FavoredRecipeService {

  constructor(private readonly localStorageService: LocalStorageService) { }

  addToFavoriteRecipes(id: number): void {
    const favouriteRecipes = this.localStorageService.getItem(localStorageKeys.FAVORITE_RECIPES);
    favouriteRecipes.push(id);
    this.localStorageService.setItem(localStorageKeys.FAVORITE_RECIPES, favouriteRecipes);
  }

  removeFromFavoriteRecipes(id: number): void {
    if (this.localStorageService.getItem(localStorageKeys.FAVORITE_RECIPES) !== null) {
      const favoriteRecipes = this.localStorageService.getItem(localStorageKeys.FAVORITE_RECIPES);
      const index = favoriteRecipes.indexOf(id);
      if (index >= 0) {
        favoriteRecipes.splice(index, 1);
      }
      this.localStorageService.setItem(localStorageKeys.FAVORITE_RECIPES, favoriteRecipes);
    }
  }

  isRecipeFavoured(id: number): boolean {
    const favouriteRecipes = this.localStorageService.getItem(localStorageKeys.FAVORITE_RECIPES);
    return favouriteRecipes.includes(id);
  }
}
