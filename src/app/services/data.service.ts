import { Injectable } from '@angular/core';
import { Recipe } from '../entity/recipe';
import { ingredients } from '../types';
import { TranslationService } from './translation.service';
import { LocalStorageService } from './local-storage.service';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tagList: number[] = [];

  constructor(private readonly translationService: TranslationService,
              private readonly localStorageService: LocalStorageService,
              private readonly shoppingListService: ShoppingListService,
  ) {
    for (const index in ingredients) {
      if (index in ingredients) {
        this.tagList.push(parseInt(index, 10));
      }
    }
    this.shoppingListService.updateShoppingLists();
  }

  getTagsBySearchString(searchValue: string) {
    if (searchValue && searchValue !== '') {
      return this.tagList.filter(
        id => this.translationService.translate(ingredients[id]).toLowerCase().includes(searchValue.toLowerCase()));
    }
    return [];
  }

  addRecipe(recipe: Recipe) {
    this.localStorageService.addRecipeToSelectedRecipes(recipe);
    this.shoppingListService.updateShoppingLists();
  }
}
