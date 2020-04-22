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
  private ingredientIds: number[] = [];
  private tabElements = { regionIds: [], categoryIds: [] };
  private ingredients = ingredients;

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

  removeRecipeId(id: number) {
    if (typeof this.ingredientIds !== 'undefined' && typeof id !== 'undefined') {
      const index = this.ingredientIds.indexOf(id);
      if (index >= 0) {
        this.ingredientIds.splice(index, 1);
      }
    }
  }

  onDefaultIngredientsChange($event: boolean) {
  }

  onFridgeStatusChange($event: boolean) {
    if ($event) {
      const idList: number[] = this.fridgeService.fridgeIngredientsById;
      this.firebaseService.filterSearchResultByIdList(idList, 'ingredients');
    } else {
      this.firebaseService.searchRecipesByParams(this.ingredientIds);
    }
  }
}
