import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { regions, ingredients, categories } from '../../types';
import { TranslationService } from '../../services/translation.service';
import { FirebaseService } from '../../services/firebase.service';
import { FridgeService } from '../../services/fridge.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less'],
})
export class SearchPageComponent implements OnInit {
  private userSelectedIngredientIds: number[] = [];
  private fridgeIds: number[] = [];
  private tabElements = { regionIds: [], categoryIds: [] };
  private ingredients = ingredients;
  private fridgeFlagActive = false;

  constructor(private dataService: DataService, private translationService: TranslationService,
              private firebaseService: FirebaseService, private fridgeService: FridgeService) {
    for (const index in regions) {
      if (index in regions) {
        this.tabElements.regionIds.push(index);
      }
    }
    for (const index in categories) {
      if (index in categories) {
        this.tabElements.categoryIds.push(index);
      }
    }
  }

  ngOnInit() {
  }

  get fullListIngredientIds(): number[] {
    return [...this.userSelectedIngredientIds, ...this.fridgeIds];
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
