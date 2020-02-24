import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { Recipe } from '../../../entity/recipe';
import { TypesMappingService } from '../../../services/types-mapping.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.less'],
})
export class HeaderBarComponent implements OnInit {

  @Output() defaultIngredientsEvent = new EventEmitter<boolean>();
  @Output() fridgeStatusEvent = new EventEmitter<boolean>();

  @Input() suggestions: string[];
  @Input() fridgeFlag: boolean;
  @Input() fridgeLink: boolean;
  @Input() shoppingListButton: boolean;
  @Input() defaultIngredientsButton: boolean;
  @Input() opacity = 1;
  @Input() width = 'initial';
  @Input() background = true;
  @Input() allowElementsBehind = false;
  @Input() currentRecipe: Recipe;
  @Input() ingredientsListButton = false;
  @Input() ingredientsListButtonState = false;

  private suggestionContainerActive = false;
  private searchValue = '';
  private defaultIngredientsStatus = false;
  private fridgeContentStatus = false;
  recipeAddedToList = false;

  constructor(private location: Location, private dataService: DataService, private typesMapper: TypesMappingService) {
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

  addSuggestion(tag: string): void {
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
