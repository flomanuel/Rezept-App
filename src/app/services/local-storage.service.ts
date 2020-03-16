import {Recipe} from '../entity/recipe';
import {Injectable} from '@angular/core';
import {localStorageKeys} from '../../config';
import {Ingredient} from '../entity/ingredient.class';
import {VolumeUnit} from '../types';

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

  isRecipeFavoured(id: number): boolean {
    const favouriteRecipes = this.getItem(localStorageKeys.FAVORITE_RECIPES);
    return favouriteRecipes.includes(id);
  }

  getSelectedRecipes(): Recipe[] {
    return this.getItem(localStorageKeys.SELECTED_RECIPES);
  }

  addRecipeToSelectedRecipies(recipe: Recipe) {
    const selectedRecipes = this.getSelectedRecipes();
    selectedRecipes.push(recipe);
    this.setItem(localStorageKeys.SELECTED_RECIPES, selectedRecipes);
  }

  getPrivateShoppingList(): Ingredient[] {
    return this.getItem(localStorageKeys.PRIVATE_SHOPPING_LIST);
  }

  addIngredientToPrivateShoppingList(ingredient: Ingredient) {
    const privateShoppingList = this.getPrivateShoppingList();
    privateShoppingList.push(ingredient);
    this.setItem(localStorageKeys.PRIVATE_SHOPPING_LIST, privateShoppingList);
  }

  deleteIngredientFromPrivateShoppingList(ingredient: Ingredient) {
    let privateShoppingList = this.getPrivateShoppingList();
    const temporaryList = [];
    privateShoppingList.forEach(ingredientInList => {
      if (ingredientInList.label !== ingredient.label) {
        temporaryList.push(ingredientInList);
      }
    });
    privateShoppingList = temporaryList;
    this.setItem(localStorageKeys.PRIVATE_SHOPPING_LIST, privateShoppingList);
  }

  getAllIngredientsFilteredShoppingList(): Ingredient[] {
    return this.getItem(localStorageKeys.ALL_INGREDIENTS_SHOPPING_LIST);
  }

  setAllIngredientsFilteredShoppingList(ingredientList: Ingredient[]) {
    const newIngredientsList = [];
    const oldIngredients = this.getAllIngredientsFilteredShoppingList();
    ingredientList.forEach(ingredient => {
      let equalOldIngredient = new Ingredient('', 0, VolumeUnit.GRAMM, 1);
      let hasEqual = false;
      oldIngredients.forEach(ingredientInList => {
        if (ingredientInList.label === ingredient.label) {
          hasEqual = true;
          equalOldIngredient = ingredientInList;
        }
      });
      if (hasEqual) {
        newIngredientsList.push(equalOldIngredient);
      } else {
        newIngredientsList.push(ingredient);
      }
    });
    this.setItem(localStorageKeys.ALL_INGREDIENTS_SHOPPING_LIST, newIngredientsList);
  }

  toggleIngredientInAllIngredientList(ingredient: Ingredient) {
    const temporaryList = this.getAllIngredientsFilteredShoppingList();
    temporaryList.forEach(ingredientInList => {
      if (ingredientInList.label === ingredient.label) {
        ingredientInList.done = ! ingredient.done;
      }
    });
    this.setItem(localStorageKeys.ALL_INGREDIENTS_SHOPPING_LIST, temporaryList);
  }
}
