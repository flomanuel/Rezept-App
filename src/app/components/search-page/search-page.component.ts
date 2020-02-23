import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Recipe } from '../../entity/recipe';
import { regions } from '../../types';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less'],
})
export class SearchPageComponent implements OnInit {
  private suggestionsList: string[] = [];
  private tabElements: string[] = [];
  private selectedFilterTabElements: string[] = [];
  private defaultIngredientsStatus = false;

  constructor(private dataService: DataService) {
    this.tabElements.push(regions['1']);
    this.tabElements.push(regions['2']);
    this.tabElements.push(regions['3']);
  }

  ngOnInit() {
  }

  removeFilterParam(tag: string, storage: string[]): boolean {
    if (storage && tag) {
      const index = storage.indexOf(tag);
      if (index >= 0) {
        storage.splice(index, 1);
        return true;
      }
      return false;
    }
  }

  get searchResult(): Recipe[] {
    const searchParams = this.suggestionsList.concat(this.selectedFilterTabElements);
    return this.dataService.searchRecipesByParams(searchParams);
  }

  onTabSelection($event: string[]): void {
    this.selectedFilterTabElements = $event;
  }

  onDefaultIngredientsChange($event: boolean) {
    this.defaultIngredientsStatus = $event;
  }
}
