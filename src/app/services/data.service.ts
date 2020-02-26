import { Injectable } from '@angular/core';
import { Ingredient } from '../entity/ingredient.class';
import { Recipe } from '../entity/recipe';
import { IngredientList } from '../entity/IngredientList';
import { ingredients, VolumeUnit } from '../types';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tagList: any[] = [];
  searchResult: Recipe[] = [];

  selectedRecepies: Recipe[] = [];
  fridgeIngredients: Ingredient[] = [];
  privateShoppingList: Ingredient[] = [];
  recipeShoppingLists: IngredientList[] = [];
  allIngredientsFilteredShoppingList: Ingredient[] = [];
  recipeMissingIngredients = 0;
  sharingString: string;

  constructor(private translationService: TranslationService) {
    this.tagList.push(translationService.translate(ingredients['1']));

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
    this.selectedRecepies.push(recipe);
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
    return this.privateShoppingList;
  }

  getAllIngredientsFilteredShoppingList() {
    return this.allIngredientsFilteredShoppingList;
  }

  getSharingString() {
    return this.sharingString;
  }

  addItemToPrivateShoppingList(privateIngredient: Ingredient) {
    this.privateShoppingList.push(privateIngredient);
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
    const temporaryList: Ingredient[] = [];
    this.privateShoppingList.forEach(ingredientInList => {
      if (ingredientInList.label !== ingredient.label) {
        temporaryList.push(ingredientInList);
      }
    });
    this.privateShoppingList = temporaryList;
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

  isIngredientInFridge(ingredient: Ingredient): boolean {
    this.recipeMissingIngredients++;
    let ingredientAvailable = false;
    this.fridgeIngredients.forEach(fridgeIngredient => {
      if (!ingredientAvailable && fridgeIngredient.id === ingredient.id) {
        this.recipeMissingIngredients--;
        ingredientAvailable = true;
      }
    });
    return ingredientAvailable;
  }

  private getAllIngredientsFromRecipes() {
    const availableIngredients: Ingredient[] = this.fridgeIngredients;
    let allIngredients: Ingredient[] = [];

    this.selectedRecepies.forEach(recipe => {
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

  // tslint:disable-next-line:max-line-length
  private sumIngredientsAmountAndDeleteFromListIfFridgeIsSufficient(allIngredients: Ingredient[], ingredient: Ingredient, availableIngredients: Ingredient[]) {
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

    sharingString += 'Einkaufszettel: \n';
    this.allIngredientsFilteredShoppingList.forEach(ingredient => {
      sharingString += ingredient.label + ' ' + ingredient.amount + ' ' + ingredient.volumeUnit;
      if (this.allIngredientsFilteredShoppingList.indexOf(ingredient) !== this.allIngredientsFilteredShoppingList.length - 1) {
        sharingString += ', \n';
      }
    });
    if (this.privateShoppingList.length > 0) {
      sharingString += ' \n--- \nZusätzliche Produkte: \n';
      this.privateShoppingList.forEach(ingredient => {
        sharingString += ingredient.label;
        if (this.privateShoppingList.indexOf(ingredient) !== this.privateShoppingList.length - 1) {
          sharingString += ', \n';
        }
      });
    }
    sharingString += '\n\nEinkaufszettel erstellt mit Gourmet Fridge';

    this.sharingString = encodeURIComponent(sharingString);
    return encodeURIComponent(sharingString);
  }

}
