import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { regions, ingredients, categories } from '../../types';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less'],
})
export class SearchPageComponent implements OnInit {
  private ingredientIds: number[] = [];
  private tabElements = { regionsIds: [], categoriesIds: [] };
  private selectedFilterTabElements: number[] = [];
  private defaultIngredientsStatus = false;
  private ingredients = ingredients;

  constructor(private dataService: DataService, private translationService: TranslationService) {
    for (const index in regions) {
      if (index in regions) {
        this.tabElements.regionsIds.push(index);
      }
    }

    for (const index in categories) {
      if (index in categories) {
        this.tabElements.categoriesIds.push(index);
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

  onTabSelection($event: number[]): void {
    this.selectedFilterTabElements = $event;
  }

  onDefaultIngredientsChange($event: boolean) {
    this.defaultIngredientsStatus = $event;
  }
}
