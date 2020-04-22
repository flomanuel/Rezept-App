import { Injectable } from '@angular/core';
import { Ingredient } from '../entity/ingredient.class';
import { Recipe } from '../entity/recipe';
import { IngredientList } from '../entity/IngredientList';
import { ingredients } from '../types';
import { TranslationService } from './translation.service';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';
import { localStorageKeys } from '../../config';
import { FridgeService } from './fridge.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tagList: number[] = [];
  recipeShoppingLists: IngredientList[] = [];
  sharingString: string;

  constructor(private translationService: TranslationService, private firebaseService: FirebaseService,
              private localStorageService: LocalStorageService, private fridgeService: FridgeService) {
    this.localStorageService = localStorageService;
    for (const index in ingredients) {
      if (index in ingredients) {
        this.tagList.push(parseInt(index, 10));
      }
    }
    this.updateShoppingLists();
  }

  get fridgeIngredients() {
    return this.fridgeService.fridgeIngredients;
  }

  getTagsBySearchString(searchValue: string) {
    if (searchValue && searchValue !== '') {
      return this.tagList.filter(
        id => this.translationService.translate(ingredients[id]).toLowerCase().includes(searchValue.toLowerCase()));
    }
    return [];
  }

  addRecipe(recipe: Recipe) {
    this.localStorageService.addRecipeToSelectedRecipies(recipe);
    this.updateShoppingLists();
    this.localStorageService.setAllIngredientsFilteredShoppingList(this.getAllIngredientsFromRecipes());
    this.sharingString = this.createSharingStringFromIngredients();
  }

  getRecipeFilteredShoppingLists() {
    return this.recipeShoppingLists;
  }

  getPrivateShoppingList() {
    return this.localStorageService.getPrivateShoppingList();
  }

  getAllIngredientsFilteredShoppingList() {
    return this.localStorageService.getAllIngredientsFilteredShoppingList();
  }

  getSharingString() {
    return this.sharingString;
  }

  addItemToPrivateShoppingList(privateIngredient: Ingredient) {
    this.localStorageService.addIngredientToPrivateShoppingList(privateIngredient);
  }

  deleteIngredientFromList(ingredient: Ingredient, ingredientsList: Ingredient[]) {
    const temporaryList: Ingredient[] = [];
    ingredientsList.forEach(ingredientInList => {
      if (ingredientInList.label !== ingredient.label) {
        temporaryList.push(ingredientInList);
      }
    });
    return temporaryList;
  }

  deleteIngredientFromPrivateShoppingList(ingredient: Ingredient) {
    this.localStorageService.deleteIngredientFromPrivateShoppingList(ingredient);
  }

  updateShoppingLists() {
    this.recipeShoppingLists = [];
    this.localStorageService.getSelectedRecipes().forEach(recipe => {
      this.recipeShoppingLists.push(this.getIngredientsListForRecipe(recipe));
    });
    this.localStorageService.setAllIngredientsFilteredShoppingList(this.getAllIngredientsFromRecipes());
  }

  getIngredientsListForRecipe(recipe: Recipe) {
    const neededIngredients: Ingredient[] = recipe.ingredients;
    const ingredientList: IngredientList = new IngredientList(recipe.title);

    neededIngredients.forEach(neededIngredient => {
      ingredientList.push(neededIngredient);
    });
    return ingredientList;
  }

  ingredientIsInList(ingredient: Ingredient, ingredientList: Ingredient[]): boolean {
    let ingredientIsInList = false;
    ingredientList.forEach(ingredientInList => {
      if (ingredientInList.label === ingredient.label) {
        ingredientIsInList = true;
      }
    });

    return ingredientIsInList;
  }

  private getAllIngredientsFromRecipes() {
    const selectedRecipes = this.localStorageService.getSelectedRecipes();
    const availableIngredients: Ingredient[] = this.fridgeIngredients;
    let allIngredients: Ingredient[] = [];

    selectedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (this.ingredientIsInList(ingredient, allIngredients)) {
          allIngredients = this.sumIngredientsAmountAndDeleteFromListIfFridgeIsSufficient(allIngredients, ingredient, availableIngredients);
        } else {
          if (this.ingredientIsInList(ingredient, availableIngredients)) {
            this.pushIngredientInListIfNeeded(availableIngredients, ingredient, allIngredients);
          } else {
            allIngredients.push(ingredient);
          }
        }
      });
    });
    return allIngredients;
  }

  private sumIngredientsAmountAndDeleteFromListIfFridgeIsSufficient(allIngredients: Ingredient[], ingredient: Ingredient,
                                                                    availableIngredients: Ingredient[]) {
    allIngredients.forEach(ingredientInList => {
      if (ingredientInList.label === ingredient.label) {
        ingredientInList.amount += ingredient.amount;
        availableIngredients.forEach(availableIngredient => {
          if (availableIngredient.label === ingredientInList.label) {
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

  private pushIngredientInListIfNeeded(availableIngredients: Ingredient[], ingredient: Ingredient, allIngredients: Ingredient[]) {
    availableIngredients.forEach(availableIngredient => {
      if (availableIngredient.label === ingredient.label) {
        let amount = availableIngredient.amount;
        amount -= ingredient.amount;
        if (amount > 0) {
          allIngredients.push(ingredient);
        }
      }
    });
  }

  public createSharingStringFromIngredients() {
    let sharingString = '';
    const privateShoppingList = this.localStorageService.getPrivateShoppingList();

    sharingString += 'Einkaufszettel: \n';
    this.getAllIngredientsFilteredShoppingList().forEach(ingredient => {
      sharingString += ingredient.label + ' ' + ingredient.amount + ' ' + ingredient.volumeUnit;
      if (this.getAllIngredientsFilteredShoppingList().indexOf(ingredient) !== this.getAllIngredientsFilteredShoppingList().length - 1) {
        sharingString += ', \n';
      }
    });
    if (privateShoppingList.length > 0) {
      sharingString += ' \n--- \nZusätzliche Produkte: \n';
      privateShoppingList.forEach(ingredient => {
        sharingString += ingredient.label;
        if (privateShoppingList.indexOf(ingredient) !== privateShoppingList.length - 1) {
          sharingString += ', \n';
        }
      });
    }
    sharingString += '\n\nEinkaufszettel erstellt mit Gourmet Fridge';

    this.sharingString = encodeURIComponent(sharingString);
    return encodeURIComponent(sharingString);
  }


  toggleIngredient(localeStorageKey: localStorageKeys, ingredient: Ingredient) {
    if (localeStorageKey === localStorageKeys.SELECTED_RECIPES) {
      this.localStorageService.toggleIngredientInAllIngredientList(ingredient);
    } else {
      const ingredientList = this.localStorageService.getItem(localeStorageKey);
      const index = ingredientList.map(actualIngredient => {
        return actualIngredient.label;
      }).indexOf(ingredient.label);
      const ingredientInList = ingredientList[index];
      ingredientInList.done = !ingredientInList.done;
      ingredientList[index] = ingredientInList;
      this.localStorageService.setItem(localeStorageKey, ingredientList);
    }
  }

  public getIdListFromIngredients(ingredientList: Ingredient[]): number[] {
    if (ingredientList.length > 0) {
      const idList: number[] = [];
      ingredientList.forEach(ingredient => {
        idList.push(ingredient.id);
      });
      return idList;
    } else {
      return [];
    }
  }
}
