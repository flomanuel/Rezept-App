import { Injectable } from '@angular/core';
import { localStorageKeys } from '../../config';
import { Ingredient } from '../entity/ingredient.class';
import { LocalStorageService } from './local-storage.service';
import { IngredientList } from '../entity/IngredientList';
import { Recipe } from '../entity/recipe';
import { VolumeUnit } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private recipeShoppingLists: IngredientList[] = [];

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  toggleIngredient(localStorageKey: string, ingredient: Ingredient): void {
    if (localStorageKey === localStorageKeys.SELECTED_RECIPES) {
      this.toggleIngredientInList(localStorageKeys.ALL_INGREDIENTS_SHOPPING_LIST, ingredient);
    } else {
      this.toggleIngredientInList(localStorageKey, ingredient);
    }
  }

  toggleIngredientInList(localStorageKey: string, ingredient: Ingredient): void {
    const temporaryList = this.localStorageService.getItem(localStorageKey);
    const i = temporaryList.indexOf(ingredient);
    const ingredientFromList = temporaryList.find(ingredientInList => ingredientInList.customTitle === ingredient.customTitle);

    try {
      ingredientFromList.done = !ingredientFromList.done;
      temporaryList[i] = ingredientFromList;
    } catch (e) {
      // Do nothing when no ingredient was found
    }

    this.localStorageService.setItem(localStorageKey, temporaryList);
  }

  updateShoppingLists(): void {
    this.recipeShoppingLists = this.selectedRecipes.map(recipe => this.getIngredientsListForRecipe(recipe));
    this.setAllIngredientsFilteredShoppingList(this.getAllIngredientsFromRecipes());
  }

  getAllIngredientsFromRecipes(): Ingredient[] {
    const availableIngredients: Ingredient[] = this.localStorageService.getItem(localStorageKeys.FRIDGE_INGREDIENTS);
    let allIngredients: Ingredient[] = [];

    this.selectedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (allIngredients.includes(ingredient)) {
          allIngredients = this.sumIngredientsAmountAndDeleteFromListIfFridgeIsSufficient(allIngredients, ingredient, availableIngredients);
        } else {
          allIngredients.push(ingredient);
        }
      });
    });
    return allIngredients;
  }

  private sumIngredientsAmountAndDeleteFromListIfFridgeIsSufficient(
    allIngredients: Ingredient[],
    ingredient: Ingredient,
    availableIngredients: Ingredient[]): Ingredient[] {
    allIngredients.forEach(ingredientInList => {
      if (ingredientInList.customTitle === ingredient.customTitle) {
        ingredientInList.amount += ingredient.amount;
        availableIngredients.forEach(availableIngredient => {
          if (availableIngredient.customTitle === ingredientInList.customTitle) {
            ingredientInList.amount -= availableIngredient.amount;
            if (ingredientInList.amount <= 0) {
              allIngredients = this.deleteIngredientFromList(ingredientInList, allIngredients);
            }
          }
        });
      }
    });
    return allIngredients;
  }

  deleteIngredientFromList(ingredient: Ingredient, ingredientsList: Ingredient[]): Ingredient[] {
    return ingredientsList.filter(ingredientInList => ingredientInList.customTitle !== ingredient.customTitle);
  }

  getIngredientsListForRecipe(recipe: Recipe): IngredientList {
    return recipe.ingredients.reduce((ingredientList, neededIngredient) => {
      ingredientList.push(neededIngredient);
      return ingredientList;
    }, new IngredientList(recipe.title));
  }

  deleteIngredientFromPrivateShoppingList(ingredient: Ingredient): void {
    const filteredPrivateShoppingList = this.localStorageService
      .getItem(localStorageKeys.PRIVATE_SHOPPING_LIST)
      .filter(ingredientInList => ingredientInList.customTitle !== ingredient.customTitle);

    this.localStorageService.setItem(localStorageKeys.PRIVATE_SHOPPING_LIST, filteredPrivateShoppingList);
  }

  addIngredientToPrivateShoppingList(ingredient: Ingredient): void {
    const privateShoppingList = this.localStorageService.getItem(localStorageKeys.PRIVATE_SHOPPING_LIST);
    privateShoppingList.push(ingredient);
    this.localStorageService.setItem(localStorageKeys.PRIVATE_SHOPPING_LIST, privateShoppingList);
  }

  setAllIngredientsFilteredShoppingList(ingredientList: Ingredient[]): void {
    const newIngredientsList = [];
    const oldIngredients = this.allIngredientsFilteredShoppingList;
    ingredientList.forEach(ingredient => {
      let equalOldIngredient = Ingredient.createBasic('');
      let hasEqual = false;
      oldIngredients.forEach(ingredientInList => {
        if (ingredientInList.customTitle === ingredient.customTitle) {
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
    this.localStorageService.setItem(localStorageKeys.ALL_INGREDIENTS_SHOPPING_LIST, newIngredientsList);
  }

  addRecipeToSelectedRecipes(recipe: Recipe): void {
    const selectedRecipes = this.selectedRecipes;
    selectedRecipes.push(recipe);
    this.localStorageService.setItem(localStorageKeys.SELECTED_RECIPES, selectedRecipes);
  }

  get allIngredientsFilteredShoppingList(): any[] {
    return this.localStorageService.getItem(localStorageKeys.ALL_INGREDIENTS_SHOPPING_LIST);
  }

  get selectedRecipes(): Recipe[] {
    return this.localStorageService.getItem(localStorageKeys.SELECTED_RECIPES);
  }

  get recipeFilteredShoppingLists(): IngredientList[] {
    return this.recipeShoppingLists;
  }

  get privateShoppingList(): Ingredient[] {
    return this.localStorageService.getItem(localStorageKeys.PRIVATE_SHOPPING_LIST);
  }
}
