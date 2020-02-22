import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../entity/ingredient.class';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less']
})
export class ShoppingListComponent implements OnInit {

  privateIngredient: Ingredient;
  recipeFilter: boolean;

  constructor(private dataService: DataService) {
    this.privateIngredient = new Ingredient();
    this.recipeFilter = true;
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
    if (this.privateIngredient.label !== undefined) {
      this.dataService.addItemToPrivateShoppingList(this.privateIngredient);
      this.privateIngredient = new Ingredient();
      this.createSharingString();
    }
  }

  toggleIngredient(ingredient: Ingredient) {
    ingredient.done = !ingredient.done;
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
