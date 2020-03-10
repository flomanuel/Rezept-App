import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../entity/ingredient.class';
import { DataService } from '../../services/data.service';
import { VolumeUnit } from '../../types';
import {LocalStorageService} from '../../services/local-storage.service';
import {localStorageKeys} from '../../../config';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less'],
})
export class ShoppingListComponent implements OnInit {

  privateIngredient: Ingredient;
  recipeFilter: boolean;
  localStorageService: LocalStorageService;

  constructor(private dataService: DataService, localStorageService: LocalStorageService) {
    this.privateIngredient = new Ingredient('', 0, VolumeUnit.GRAMM, 1, 0);
    this.recipeFilter = true;
    this.localStorageService = localStorageService;
  }

  get recipeFilteredShoppingLists() {
    return this.dataService.getRecipeFilteredShoppingLists();
  }

  get sharingString() {
    return this.dataService.getSharingString();
  }

  get allIngredientsFilteredShoppingList() {
    return this.dataService.getAllIngredientsFilteredShoppingList();
  }

  get privateShoppingList() {
    return this.dataService.getPrivateShoppingList();
  }

  addNewPrivateIngredient() {
    if (this.privateIngredient.label !== '') {
      this.dataService.addItemToPrivateShoppingList(this.privateIngredient);
      this.privateIngredient = new Ingredient('', 0, VolumeUnit.GRAMM, 1, 0);
      this.createSharingString();
    }
  }

  toggleIngredient(localStorageKey: localStorageKeys, ingredient: Ingredient) {
    this.dataService.toggleIngredient(localStorageKey, ingredient);
  }

  toggleFilter() {
    this.recipeFilter = !this.recipeFilter;
  }

  deleteItem(ingredient: Ingredient) {
    this.dataService.deleteIngredientFromPrivateShoppingList(ingredient);
    this.createSharingString();
  }

  ngOnInit() {
  }

  createSharingString() {
    this.dataService.createSharingStringFromIngredients();
  }
}
