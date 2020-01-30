import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../entity/Tag';

@Component({
  selector: 'app-search-page-filter-tab',
  templateUrl: './search-page-filter-tab.component.html',
  styleUrls: ['./search-page-filter-tab.component.less']
})
export class SearchPageFilterTabComponent implements OnInit {

  @Input() tabElements: Tag[];
  @Output() tabSelection = new EventEmitter<Tag[]>();

  private showTabElements = false;
  private selectedTabElements: Tag[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  selectTabElement(tabElement: Tag): boolean {
    if (this.selectedTabElements && tabElement) {
      this.selectedTabElements.push(tabElement);
      this.tabSelection.emit(this.selectedTabElements);
      return true;
    }
    return false;
  }

  deselectTabElement(tabElement: Tag): boolean {
    if (this.selectedTabElements && tabElement) {
      const index = this.selectedTabElements.indexOf(tabElement);
      if (index >= 0) {
        this.selectedTabElements.splice(index, 1);
        return true;
      }
      return false;
    }
    this.tabSelection.emit(this.selectedTabElements);
  }
}
