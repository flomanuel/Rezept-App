import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Recipe } from '../entity/recipe';
import { localStorageKeys } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  constructor(private readonly localStorageService: LocalStorageService) { }

  get allRecipes(): Recipe[] {
    return this.localStorageService.getItem(localStorageKeys.CREATED_RECIPES);
  }

  saveRecipe(recipe: Recipe) {
    const recipes = this.localStorageService.getItem(localStorageKeys.CREATED_RECIPES);
    recipes.push(recipe);
    this.localStorageService.setItem(localStorageKeys.CREATED_RECIPES, recipes);
  }

  deleteRecipe(recipe: Recipe): Recipe[] {
    const allUserRecipes = this.localStorageService.getItem(localStorageKeys.CREATED_RECIPES);
    const filteredRecipes = allUserRecipes.filter((rec: Recipe) => rec.title !== recipe.title);

    this.localStorageService.setItem(localStorageKeys.CREATED_RECIPES, filteredRecipes);
    return filteredRecipes;
  }
}
