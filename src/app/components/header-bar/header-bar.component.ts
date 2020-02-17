import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Tag } from '../../entity/Tag';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.less'],
})
export class HeaderBarComponent implements OnInit {

  @Output() defaultIngredientsEvent = new EventEmitter<boolean>();
  @Output() fridgeStatusEvent = new EventEmitter<boolean>();

  @Input() suggestions: Tag[];
  @Input() fridgeFlag: boolean;
  @Input() fridgeLink: boolean;
  @Input() shoppingListButton: boolean;
  @Input() defaultIngredientsButton: boolean;
  @Input() opacity = 1;

  private suggestionContainerActive = false;
  private searchValue = '';
  private defaultIngredientsStatus = false;
  private fridgeContentStatus = false;

  constructor(private location: Location, private dataService: DataService) {
  }

  ngOnInit() {
  }

  goBack(): void {
    if (this.suggestionContainerActive) {
      this.toggleSuggestionsContainer();
    } else {
      this.location.back();
    }
  }

  toggleSuggestionsContainer(value?: boolean): void {
    if (value !== undefined && typeof value === 'boolean') {
      this.suggestionContainerActive = value;
    } else {
      this.suggestionContainerActive = !this.suggestionContainerActive;
    }
  }

  addSuggestion(tag: Tag): void {
    this.suggestions.push(tag);
    this.searchValue = '';
    this.toggleSuggestionsContainer();
  }

  toggleIngredientsStatus(): void {
    this.defaultIngredientsStatus = !this.defaultIngredientsStatus;
    this.defaultIngredientsEvent.emit(this.defaultIngredientsStatus);
  }

  toggleFridgeStatus(): void {
    this.fridgeContentStatus = !this.fridgeContentStatus;
    this.fridgeStatusEvent.emit(this.fridgeContentStatus);
  }
}
