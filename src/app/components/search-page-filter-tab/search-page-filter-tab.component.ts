import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { categories, regions } from 'src/app/types';

@Component({
  selector: 'app-search-page-filter-tab',
  templateUrl: './search-page-filter-tab.component.html',
  styleUrls: ['./search-page-filter-tab.component.less'],
})
export class SearchPageFilterTabComponent implements OnInit {

  @Input() tabElements: { regionsIds: number[], categoriesIds: number[] };
  @Output() tabSelection = new EventEmitter<number[]>();

  private showTabElements = false;
  private selectedTabElements = { regionsIds: [], categoriesIds: [] };
  private regions = regions;
  private categories = categories;

  constructor(private translationService: TranslationService) {
  }

  ngOnInit() {
  }

  selectTabElement(tabElement: number, type: string): boolean {
    let selectedTabElements;
    if (type === 'region') {
      selectedTabElements = this.selectedTabElements.regionsIds;
    } else if (type === 'category') {
      selectedTabElements = this.selectedTabElements.categoriesIds;
    }

    if (selectedTabElements !== undefined && tabElement) {
      selectedTabElements.push(tabElement);
      this.tabSelection.emit(selectedTabElements);
      return true;
    }
    return false;
  }

  deselectTabElement(tabElement: number, type: string): boolean {
    let selectedTabElements;
    if (type === 'region') {
      selectedTabElements = this.selectedTabElements.regionsIds;
    } else if (type === 'category') {
      selectedTabElements = this.selectedTabElements.categoriesIds;
    }

    if (selectedTabElements !== undefined && tabElement) {
      const index = selectedTabElements.indexOf(tabElement);
      if (index >= 0) {
        selectedTabElements.splice(index, 1);
        return true;
      }
      return false;
    }
    this.tabSelection.emit(selectedTabElements);
  }
}
