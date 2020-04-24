import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { Recipe } from '../../../entity/recipe';
import { TypesMappingService } from '../../../services/types-mapping.service';
import { ingredients } from '../../../types';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.less'],
})
export class HeaderBarComponent implements OnInit {

  @Output() defaultIngredientsStatusEvent = new EventEmitter<boolean>();
  @Output() ingredientListChange = new EventEmitter<boolean>();
  @Output() fridgeStatusEvent = new EventEmitter<boolean>();
  @Output() defaultIngredientsUiOpenedEvent = new EventEmitter<boolean>();

  @Input() ingredientIdList: number[];
  @Input() fridgeFlag: boolean;
  @Input() fridgeLink: boolean;
  @Input() shoppingListButton: boolean;
  @Input() defaultIngredientsButton: boolean;
  @Input() opacity = 1;
  @Input() position = 'sticky';
  @Input() width = 'initial';
  @Input() background = true;
  @Input() allowElementsBehind = false;
  @Input() currentRecipe: Recipe;
  @Input() ingredientsListButton = false;
  @Input() ingredientsListButtonState = false;
  @Input() defaultIngredientsUiOpener = false;
  @Input() isDefaultIngredientsUiOpened = false;

  private suggestionContainerActive = false;
  private searchValue = '';
  private defaultIngredientsStatus = false;
  private fridgeContentStatus = false;
  private ingredients = ingredients;
  private recipeAddedToList = false;

  constructor(private location: Location, private dataService: DataService, private typesMapper: TypesMappingService,
              private translationService: TranslationService) {
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

  addSuggestion(ingredient: number) {
    this.ingredientIdList.push(ingredient);
    this.searchValue = '';
    this.toggleSuggestionsContainer();
    this.ingredientListChange.emit(true);
  }

  toggleIngredientsStatus(): void {
    this.defaultIngredientsStatus = !this.defaultIngredientsStatus;
    this.defaultIngredientsStatusEvent.emit(this.defaultIngredientsStatus);
  }

  toggleFridgeStatus(emitEvent: boolean = false): void {
    this.fridgeContentStatus = !this.fridgeContentStatus;
    if (emitEvent) {
      this.fridgeStatusEvent.emit(this.fridgeContentStatus);
    }
  }

  toggleDefaultIngredientsUiStatus(): void {
    this.isDefaultIngredientsUiOpened = !this.isDefaultIngredientsUiOpened;
    this.defaultIngredientsUiOpenedEvent.emit(this.isDefaultIngredientsUiOpened);
  }

  addRecipeToShoppingList() {
    if (this.currentRecipe && !this.recipeAddedToList) {
      this.dataService.addRecipe(this.currentRecipe);
      this.recipeAddedToList = true;
    }
  }
}
