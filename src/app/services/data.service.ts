import {Injectable} from '@angular/core';
import {Ingredient} from '../entity/ingredient.class';
import {Recipe} from '../entity/recipe';
import {IngredientList} from '../entity/IngredientList';
import {categories, ingredients, regions, VolumeUnit} from '../types';
import {TranslationService} from './translation.service';
import {LocalStorageService} from './local-storage.service';
import {localStorageKeys} from '../../config';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tagList: any[] = [];
  searchResult: Recipe[] = [];

  fridgeIngredients: Ingredient[] = [];
  recipeShoppingLists: IngredientList[] = [];
  allIngredientsFilteredShoppingList: Ingredient[] = [];
  localStorageService: LocalStorageService;
  sharingString: string;

  constructor(private translationService: TranslationService, localStorageService: LocalStorageService) {
    this.tagList.push(translationService.translate(ingredients['1']));
    this.localStorageService = localStorageService;

    this.searchResult.push(new Recipe(
      Math.floor(Math.random() * 9000),
      'Pizza',
      130,
      [],
      [],
      [new Ingredient('Test', 2, VolumeUnit.GRAMM, 1, 0)],
      '',
      [],
      ''));
  }

  getTagsBySearchString(searchValue: string) {
    if (searchValue && searchValue !== '') {
      return this.tagList.filter(
        title => title.toLowerCase().includes(searchValue.toLowerCase()));
    }
    return [];
  }

  searchRecipesByParams(params: string[]): Recipe[] {
    if (params.length > 0) {
      return this.searchResult;
    }
    return [];
  }

  addRecipe(recipe: Recipe) {
    this.localStorageService.addRecipeToSelectedRecipies(recipe);
    this.recipeShoppingLists.push(this.getIngredientsListForRecipe(recipe));
    this.allIngredientsFilteredShoppingList = this.getAllIngredientsFromRecipes();
    this.sharingString = this.createSharingStringFromIngredients();
  }

  addFridgeIngredient(ingredient: Ingredient) {
    this.fridgeIngredients.push(ingredient);
  }

  getRecipeFilteredShoppingLists() {
    return this.recipeShoppingLists;
  }

  getPrivateShoppingList() {
    return this.localStorageService.getPrivateShoppingList();
  }

  getAllIngredientsFilteredShoppingList() {
    return this.allIngredientsFilteredShoppingList;
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
    this.allIngredientsFilteredShoppingList.forEach(ingredient => {
      sharingString += ingredient.label + ' ' + ingredient.amount + ' ' + ingredient.volumeUnit;
      if (this.allIngredientsFilteredShoppingList.indexOf(ingredient) !== this.allIngredientsFilteredShoppingList.length - 1) {
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
