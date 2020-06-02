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

  isAmountI1SmallerI2(ingredient1: Ingredient, ingredient2: Ingredient): boolean {
    return ingredient1.volumeUnit === ingredient2.volumeUnit && ingredient1.amount <= ingredient2.amount;
  }

  isIngredientInFridge(ingredientToCheck: Ingredient): boolean {
    let ingredientAvailable = false;
    this.fridgeIngredients.forEach(i => {
      if (!ingredientAvailable && i.id === ingredientToCheck.id && this.isAmountI1SmallerI2(ingredientToCheck, i)) {
        ingredientAvailable = true;
      }
    });

    return ingredientAvailable;
  }
}
