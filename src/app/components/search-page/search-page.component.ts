import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { regions, ingredients, categories } from '../../types';
import { TranslationService } from '../../services/translation.service';
import { FirebaseService } from '../../services/firebase.service';
import { FridgeService } from '../../services/fridge.service';
import { DefaultIngredientService } from '../../services/default-ingredient.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less'],
})
export class SearchPageComponent implements OnInit {
  private userSelectedIngredientIds: number[] = [];
  private fridgeIds: number[] = [];
  private defaultIngredientIds: number[] = [];
  private tabElements = { regionIds: [], categoryIds: [] };
  private ingredients = ingredients;
  private fridgeFlagActive = false;
  private defaultIngredientsFlagActive = false;

  constructor(private dataService: DataService, private translationService: TranslationService,
              private firebaseService: FirebaseService, private fridgeService: FridgeService,
              private defaultIngredientService: DefaultIngredientService) {
    this.firebaseService.searchResult = [];
    this.tabElements.regionIds = Object.keys(regions).map(el => parseInt(el, 10));
    this.tabElements.categoryIds = Object.keys(categories).map(el => parseInt(el, 10));
  }

  ngOnInit() {
  }

  get fullListIngredientIds(): number[] {
    return [...this.userSelectedIngredientIds, ...this.fridgeIds, ...this.defaultIngredientIds];
  }

  removeRecipeId(id: number) {
    if (typeof this.userSelectedIngredientIds !== 'undefined' && typeof id !== 'undefined') {
      const index = this.userSelectedIngredientIds.indexOf(id);
      if (index >= 0) {
        this.userSelectedIngredientIds.splice(index, 1);
      }
    }
  }

  onDefaultIngredientsChange($event: boolean) {
    this.defaultIngredientsFlagActive = $event;
    if ($event) {
      this.defaultIngredientIds = this.defaultIngredientService.defaultIngredientsById;
    } else {
      this.defaultIngredientIds = [];
    }
    this.firebaseService.searchRecipesByParams(this.fullListIngredientIds);
  }

  onFridgeStatusChange($event: boolean) {
    this.fridgeFlagActive = $event;
    if ($event) {
      this.fridgeIds = this.fridgeService.fridgeIngredientsById;
    } else {
      this.fridgeIds = [];
    }
    this.firebaseService.searchRecipesByParams(this.fullListIngredientIds);
  }
}
