import { Recipe } from '../entity/recipe';
import { Injectable } from '@angular/core';
import { localStorageKeys } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem(key: string): any[] {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  setItem(key: string, value: any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  addToFavoriteRecipes(id: number): void {
    const favouriteRecipes = this.getItem(localStorageKeys.FAVORITE_RECIPES);
    favouriteRecipes.push(id);
    this.setItem(localStorageKeys.FAVORITE_RECIPES, favouriteRecipes);
  }

  removeFromFavoriteRecipes(id: number) {
    if (this.getItem(localStorageKeys.FAVORITE_RECIPES) !== null) {
      const favoriteRecipes = this.getItem(localStorageKeys.FAVORITE_RECIPES);
      const index = favoriteRecipes.indexOf(id);
      if (index >= 0) {
        favoriteRecipes.splice(index, 1);
      }
      this.setItem(localStorageKeys.FAVORITE_RECIPES, favoriteRecipes);
    }
  }

  isRecipeFavoured(id: number): boolean {
    const favouriteRecipes = this.getItem(localStorageKeys.FAVORITE_RECIPES);
    return favouriteRecipes.includes(id);
  }

  getSelectedRecipes(): Recipe[] {
    return this.getItem(localStorageKeys.SELECTED_RECIPES);
  }

  addRecipeToSelectedRecipes(recipe: Recipe) {
    const selectedRecipes = this.getSelectedRecipes();
    selectedRecipes.push(recipe);
    this.setItem(localStorageKeys.SELECTED_RECIPES, selectedRecipes);
  }

  reset(): void {
    localStorage.clear();
  }
}
