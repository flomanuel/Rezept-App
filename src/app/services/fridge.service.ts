import { Injectable } from '@angular/core';
import { Ingredient } from '../entity/ingredient.class';
import { LocalStorageService } from './local-storage.service';
import { localStorageKeys } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  public newIngredientsIdList: number[] = [];
  public fridgeIngredients: Ingredient[];

  constructor(private localStorageService: LocalStorageService) {
    this.fridgeIngredients = this.localStorageService.getItem(localStorageKeys.FRIDGE_INGREDIENTS);
  }

  public updateFridgeIngredients(): void {
    this.newIngredientsIdList.forEach(id => {
      if (!this.fridgeIngredients.some(ingredient => {
        return ingredient.id === id;
      })) {
        this.fridgeIngredients.push(new Ingredient('', 0, '', id));
      }
    });
  }

  public removeIngredient(ingredientToRemove): void {
    this.fridgeIngredients = this.fridgeIngredients.filter(ingredient => ingredient.id !== ingredientToRemove.id);
    this.updateFridgeInLocalStorage();
  }

  public updateFridgeInLocalStorage() {
    this.localStorageService.setItem(localStorageKeys.FRIDGE_INGREDIENTS, this.fridgeIngredients);
  }

  get fridgeIngredientsById(): number[] {
    const ids: number[] = [];
    this.fridgeIngredients.forEach(ingredient => {
      ids.push(ingredient.id);
    });
    return ids;
  }

  isIngredientInFridge(ingredient: Ingredient): boolean {
    let ingredientAvailable = false;
    this.fridgeIngredients.forEach(fridgeIngredient => {
      if (!ingredientAvailable && fridgeIngredient.id === ingredient.id) {
        ingredientAvailable = true;
      }
    });
    return ingredientAvailable;
  }
}
