import { Injectable } from '@angular/core';
import { Ingredient } from '../entity/ingredient.class';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  public fridgeIngredients: Ingredient[] = [];

  constructor(private localStorageService: LocalStorageService) {
  }

  /**
   *
   * @param ingredient ingredient to add to fridge
   * @param allIngredientsFromRecipes  before Refactoring into variable: this.getAllIngredientsFromRecipes()
   */
  public addFridgeIngredient(ingredient: Ingredient, allIngredientsFromRecipes: Ingredient[]) {
    this.fridgeIngredients.push(ingredient);
    this.localStorageService.setAllIngredientsFilteredShoppingList(allIngredientsFromRecipes);
  }
}
