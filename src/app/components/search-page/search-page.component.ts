import {Component, OnInit} from '@angular/core';
import {Tag} from '../../entity/Tag';
import {DataService} from '../../services/data.service';
import {Region} from '../../entity/Region';
import {Recipe} from '../../entity/Recipe';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {
  private suggestionsList: Tag[] = [];
  private tabElements: Tag[] = [];
  private selectedFilterTabElements: Tag[] = [];
  private defaultIngredientsStatus = false;

  constructor(private dataService: DataService) {
    this.tabElements.push(new Region('Italienisch', 1));
    this.tabElements.push(new Region('Asiatisch', 2));
    this.tabElements.push(new Region('Griechisch', 3));
    this.tabElements.push(new Region('Griechisch', 3));
    this.tabElements.push(new Region('Griechisch', 3));
  }

  ngOnInit() {
  }

  removeFilterParam(tag: Tag, storage: Tag[]): boolean {
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

  onTabSelection($event: Tag[]): void {
    this.selectedFilterTabElements = $event;
  }

  onDefaultIngredientsChange($event: boolean) {
    this.defaultIngredientsStatus = $event;
  }
}