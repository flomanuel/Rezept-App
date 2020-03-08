import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Recipe } from '../../entity/recipe';
import { regions } from '../../types';
import { TranslationService } from '../../services/translation.service';
import { TypesMappingService } from '../../services/types-mapping.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less'],
})
export class SearchPageComponent implements OnInit {
  private suggestionsList: { id: number, name: string }[] = [];
  private tabElements: string[] = [];
  private selectedFilterTabElements: string[] = [];
  private defaultIngredientsStatus = false;

  constructor(private dataService: DataService, private translationService: TranslationService, private typesMapper: TypesMappingService) {
    this.tabElements.push(regions['1']);
    this.tabElements.push(regions['2']);
    this.tabElements.push(regions['3']);
  }

  ngOnInit() {
  }

  removeFilterParam(id: number, storage: { id: number, name: string }[]): boolean {
    if (storage && id) {
      const index = storage.indexOf(id);
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
