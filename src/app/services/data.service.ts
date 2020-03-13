import { Injectable } from '@angular/core';
import { Ingredient } from '../entity/ingredient.class';
import { Recipe } from '../entity/recipe';
import { IngredientList } from '../entity/IngredientList';
import { ingredients } from '../types';
import { TranslationService } from './translation.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tagList: number[] = [];
  searchResult: Recipe[] = [];
  selectedRecepies: Recipe[] = [];
  fridgeIngredients: Ingredient[] = [];
  privateShoppingList: Ingredient[] = [];
  recipeShoppingLists: IngredientList[] = [];
  allIngredientsFilteredShoppingList: Ingredient[] = [];
  sharingString: string;
  public activeSearch = false;

  constructor(private translationService: TranslationService, private firebaseService: FirebaseService) {
    for (const index in ingredients) {
      if (index in ingredients) {
        this.tagList.push(parseInt(index, 10));
      }
    }
  }

  getTagsBySearchString(searchValue: string) {
    if (searchValue && searchValue !== '') {
      return this.tagList.filter(
        id => this.translationService.translate(ingredients[id]).toLowerCase().includes(searchValue.toLowerCase()));
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

  public searchRecipesForIngredients(ingredientIds) {
    this.activeSearch = true;
    if (ingredientIds.length > 0) {

      const filteredIds = ingredientIds.reduce((result: number[], currentValue: number) => {
        return result.includes(currentValue) ? result : [...result, currentValue];
      }, []);

      this.firebaseService.searchRecipesByIngredients(filteredIds).then((collection) => {
          collection.valueChanges().subscribe((recipes: Recipe[]) => {
              if (filteredIds.length > 1) {
                this.searchResult = recipes.reduce((result: Recipe[], currentRecipe: Recipe) => {
                  if (
                    currentRecipe.ingredientsIdList.every(id => {
                      filteredIds.includes(id);
                    })
                  ) {
                    return [...result, currentRecipe];
                  }
                  return result;
                }, []);
              } else {
                this.searchResult = recipes;
              }
              this.activeSearch = false;
            },
          );
        },
      );
    } else {
      this.searchResult = [];
      this.activeSearch = false;
    }
  }
}
