import { Injectable } from '@angular/core';
import { localStorageKeys } from '../../config';
import { Ingredient } from '../entity/ingredient.class';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultIngredientService {

  public defaultIngredients: Ingredient[];

  constructor(private localStorageService: LocalStorageService) {
    this.defaultIngredients = this.localStorageService.getItem(localStorageKeys.DEFAULT_INGREDIENTS);
  }

  public addToDefaultIngredients(newIngredient) {
    this.defaultIngredients.push(newIngredient);
    this.localStorageService.setItem(localStorageKeys.DEFAULT_INGREDIENTS, this.defaultIngredients);
  }

  public removeIngredient(ingredient: Ingredient): void {
    this.defaultIngredients = this.defaultIngredients.filter(i => {
      return i.id !== ingredient.id;
    });
    this.localStorageService.setItem(localStorageKeys.DEFAULT_INGREDIENTS, this.defaultIngredients);
  }

  public isIngredientDefaultIngredient(ingredient: Ingredient) {
    return this.defaultIngredients.some(i => i.id === ingredient.id);
  }

  get defaultIngredientsById(): number[] {
    return this.defaultIngredients.map(ingredient => ingredient.id);
  }
}
