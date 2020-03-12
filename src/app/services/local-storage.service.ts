import { Recipe } from '../entity/recipe';
import { Injectable } from '@angular/core';
import { localStorageKeys } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  addToRecipes(recipe: Recipe): void {
    const recipes = this.getItem(localStorageKeys.CREATED_RECIPES);
    recipes.push(recipe);
    this.setItem(localStorageKeys.CREATED_RECIPES, recipes);
  }

  getItem(key: string): any[] {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  setItem(key: string, value: any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  addToFavouriteRecipes(id: number) {
    const favouriteRecipes = this.getItem(localStorageKeys.FAVOURITE_RECIPES);
    favouriteRecipes.push(id);
    this.setItem(localStorageKeys.FAVOURITE_RECIPES, favouriteRecipes);
  }

  removeFromFavouriteRecipes(id: number) {
    if (this.getItem(localStorageKeys.FAVOURITE_RECIPES) !== null) {
      const favouriteRecipes = this.getItem(localStorageKeys.FAVOURITE_RECIPES);
      const index = favouriteRecipes.indexOf(id);
      if (index >= 0) {
        favouriteRecipes.splice(index, 1);
      }
      this.setItem(localStorageKeys.FAVOURITE_RECIPES, favouriteRecipes);
    }
  }

  isRecipeFavoured(id: number): boolean {
    const favouriteRecipes = this.getItem(localStorageKeys.FAVOURITE_RECIPES);
    return favouriteRecipes.includes(id);
  }

  addToDefaultIngredients(id: number) {
    const defaultIngredients = this.getItem(localStorageKeys.DEFAULT_INGREDIENTS);
    defaultIngredients.push(id);
    this.setItem(localStorageKeys.DEFAULT_INGREDIENTS, defaultIngredients);
  }

  removeFromDefaultIngredients(id: number) {
    if (this.getItem(localStorageKeys.DEFAULT_INGREDIENTS) !== null) {
      const defaultIngredients = this.getItem(localStorageKeys.DEFAULT_INGREDIENTS);
      const index = defaultIngredients.indexOf(id);
      if (index >= 0) {
        defaultIngredients.splice(index, 1);
      }
      this.setItem(localStorageKeys.DEFAULT_INGREDIENTS, defaultIngredients);
    }
  }

  reset() {
    // Todo
  }
}
