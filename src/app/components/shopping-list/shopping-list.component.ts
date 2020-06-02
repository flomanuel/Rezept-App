import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../entity/ingredient.class';
import { DataService } from '../../services/data.service';
import { VolumeUnit } from '../../types';
import { LocalStorageService } from '../../services/local-storage.service';
import { localStorageKeys } from '../../../config';
import { ShoppingListService } from '../../services/shopping-list.service';
import { IngredientList } from '../../entity/IngredientList';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less'],
})
export class ShoppingListComponent implements OnInit {

  private privateIngredient: Ingredient;
  private recipeFilter: boolean;
  private localStorageService: LocalStorageService;
  private localStorageKey = localStorageKeys;
  private sharingString = '';

  constructor(private dataService: DataService,
              localStorageService: LocalStorageService,
              private readonly shoppingListService: ShoppingListService
  ) {
    this.privateIngredient = Ingredient.createBasic('');
    this.recipeFilter = true;
    this.localStorageService = localStorageService;
  }

  get recipeFilteredShoppingLists(): IngredientList[] {
    return this.shoppingListService.recipeFilteredShoppingLists;
  }

  get allIngredientsFilteredShoppingList() {
    return this.shoppingListService.allIngredientsFilteredShoppingList;
  }

  get privateShoppingList(): Ingredient[] {
    return this.shoppingListService.privateShoppingList;
  }

  addNewPrivateIngredient() {
    if (this.privateIngredient.customTitle !== '') {
      this.shoppingListService.addIngredientToPrivateShoppingList(this.privateIngredient);
      this.privateIngredient = Ingredient.createBasic('');
      this.sharingString = this.createSharingString();
    }
  }

  toggleIngredient(localStorageKey: string, ingredient: Ingredient): void {
    this.shoppingListService.toggleIngredient(localStorageKey, ingredient);
  }

  toggleFilter() {
    this.recipeFilter = !this.recipeFilter;
  }

  deleteItem(ingredient: Ingredient) {
    this.shoppingListService.deleteIngredientFromPrivateShoppingList(ingredient);
    this.sharingString = this.createSharingString();
  }

  ngOnInit() {
  }

  private createSharingString(): string {
    let sharingString = '';
    const privateShoppingList = this.privateShoppingList;

    sharingString += 'Einkaufszettel: \n';
    this.shoppingListService.allIngredientsFilteredShoppingList.forEach(ingredient => {
      sharingString += `${ingredient.customTitle} ${ingredient.amount} ${ingredient.volumeUnit}`;

      if (this.shoppingListService
        .allIngredientsFilteredShoppingList
        .indexOf(ingredient) !== this.shoppingListService.allIngredientsFilteredShoppingList.length - 1) {

        sharingString += ', \n';
      }
    });
    if (privateShoppingList.length > 0) {
      sharingString += ' \n--- \nZusätzliche Produkte: \n';
      privateShoppingList.forEach(ingredient => {
        sharingString += ingredient.customTitle;
        if (privateShoppingList.indexOf(ingredient) !== privateShoppingList.length - 1) {
          sharingString += ', \n';
        }
      });
    }
    sharingString += '\n\nEinkaufszettel erstellt mit Gourmet Fridge';

    return encodeURIComponent(sharingString);
  }
}
