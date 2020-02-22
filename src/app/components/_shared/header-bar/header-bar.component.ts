import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { Tag } from '../../../entity/Tag';
import { Recipe } from '../../../entity/recipe';

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
  @Input() width = 'initial';
  @Input() background = true;
  @Input() allowElementsBehind = false;
  @Input() currentRecipe: Recipe;

  private suggestionContainerActive = false;
  private searchValue = '';
  private defaultIngredientsStatus = false;
  private fridgeContentStatus = false;
  recipeAddedToList = false;

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

  addRecipeToShoppingList() {
    if (this.currentRecipe) {
      this.dataService.addRecipe(this.currentRecipe);
      this.recipeAddedToList = true;
    }
  }
}
