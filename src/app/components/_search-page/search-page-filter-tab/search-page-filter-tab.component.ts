import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';
import { categories, regions } from 'src/app/types';

@Component({
  selector: 'app-search-page-filter-tab',
  templateUrl: './search-page-filter-tab.component.html',
  styleUrls: ['./search-page-filter-tab.component.less'],
})
export class SearchPageFilterTabComponent implements OnInit {

  @Input() tabElements: { regionIds: number[], categoryIds: number[] };
  @Output() regionSelection = new EventEmitter<number[]>();
  @Output() categorySelection = new EventEmitter<number[]>();

  private showTabElements = false;
  private selectedTabElements = { regionIds: [], categoryIds: [] };
  private regions = regions;
  private categories = categories;

  constructor(private translationService: TranslationService) {
  }

  ngOnInit() {
  }

  selectTabElement(tabElement: number, type: string) {
    if (this.selectedTabElements !== undefined && tabElement) {
      if (type === 'region') {
        this.selectedTabElements.regionIds.push(tabElement);
        this.regionSelection.emit(this.selectedTabElements.regionIds);
        return true;
      } else if (type === 'category') {
        this.selectedTabElements.categoryIds.push(tabElement);
        this.categorySelection.emit(this.selectedTabElements.categoryIds);
        return true;
      }
    } else {
      return false;
    }
  }

  deselectTabElement(elementId: number, type: string): boolean {
    if (this.selectedTabElements !== undefined && elementId) {
      if (type === 'region') {
        const index = this.selectedTabElements.regionIds.indexOf(elementId);
        if (index >= 0) {
          this.selectedTabElements.regionIds.splice(index, 1);
          this.regionSelection.emit(this.selectedTabElements.regionIds);
          return true;
        } else {
          return false;
        }
      } else if (type === 'category') {
        const index = this.selectedTabElements.categoryIds.indexOf(elementId);
        if (index >= 0) {
          this.selectedTabElements.categoryIds.splice(index, 1);
          this.categorySelection.emit(this.selectedTabElements.categoryIds);
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
