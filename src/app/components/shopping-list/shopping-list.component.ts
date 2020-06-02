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
    this.privateIngredient = new Ingredient('', 0, VolumeUnit.GRAMM, 1, '');
    this.recipeFilter = true;
    this.localStorageService = localStorageService;
  }

  get recipeFilteredShoppingLists(): IngredientList[] {
    return this.shoppingListService.recipeFilteredShoppingLists;
  }

  get allIngredientsFilteredShoppingList() {
    return this.shoppingListService.getAllIngredientsFilteredShoppingList();
  }

  get privateShoppingList(): Ingredient[] {
    return this.shoppingListService.privateShoppingList;
  }

  addNewPrivateIngredient() {
    if (this.privateIngredient.customTitle !== '') {
      this.shoppingListService.addIngredientToPrivateShoppingList(this.privateIngredient);
      this.privateIngredient = new Ingredient('', 0, VolumeUnit.GRAMM, 1, '');
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
    this.shoppingListService.getAllIngredientsFilteredShoppingList().forEach(ingredient => {
      sharingString += `${ingredient.customTitle} ${ingredient.amount} ${ingredient.volumeUnit}`;

      if (this.shoppingListService
        .getAllIngredientsFilteredShoppingList()
        .indexOf(ingredient) !== this.shoppingListService.getAllIngredientsFilteredShoppingList().length - 1) {

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

    console.log(sharingString);
    return encodeURIComponent(sharingString);
  }
}
