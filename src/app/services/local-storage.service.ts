import { Recipe } from '../entity/recipe';
import { Injectable } from '@angular/core';
import { localStorageKeys } from '../../config';
import { Ingredient } from '../entity/ingredient.class';

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

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  addToFavouriteRecipes(id: number) {
    const favouriteRecipes = this.getItem(localStorageKeys.FAVORITE_RECIPES);
    favouriteRecipes.push(id);
    this.setItem(localStorageKeys.FAVORITE_RECIPES, favouriteRecipes);
  }

  removeFromFavouriteRecipes(id: number) {
    if (this.getItem(localStorageKeys.FAVORITE_RECIPES) !== null) {
      const favouriteRecipes = this.getItem(localStorageKeys.FAVORITE_RECIPES);
      const index = favouriteRecipes.indexOf(id);
      if (index >= 0) {
        favouriteRecipes.splice(index, 1);
      }
      this.setItem(localStorageKeys.FAVORITE_RECIPES, favouriteRecipes);
    }
  }

  removeFromUserBasicIngredients(ingredientName: string): Ingredient[] {
    const userBasicIngredients = this.getItem(localStorageKeys.USER_BASIC_INGREDIENTS);

    if (userBasicIngredients == null) {
      return;
    }

    const filtered = userBasicIngredients.filter((ingredient: Ingredient) => ingredient.label !== ingredientName);
    this.setItem(localStorageKeys.USER_BASIC_INGREDIENTS, filtered);
    return filtered;
  }

  addToUserBasicIngredients(ingredient: Ingredient): Ingredient[] {
    const userBasicIngredients = this.getItem(localStorageKeys.USER_BASIC_INGREDIENTS);
    userBasicIngredients.push(ingredient);
    this.setItem(localStorageKeys.USER_BASIC_INGREDIENTS, userBasicIngredients);
    return userBasicIngredients;
  }

  isRecipeFavoured(id: number): boolean {
    const favouriteRecipes = this.getItem(localStorageKeys.FAVORITE_RECIPES);
    return favouriteRecipes.includes(id);
  }
}
