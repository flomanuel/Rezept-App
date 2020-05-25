import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../../../entity/ingredient.class';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { localStorageKeys } from '../../../../../config';
import { TranslationService } from '../../../../services/translation.service';
import { TypesMappingService } from '../../../../services/types-mapping.service';
import { DataService } from '../../../../services/data.service';
import { DefaultIngredientService } from '../../../../services/default-ingredient.service';

@Component({
  selector: 'app-ingredient-setup-modal',
  templateUrl: './ingredient-setup-modal.component.html',
  styleUrls: ['./ingredient-setup-modal.component.less']
})
export class IngredientSetupModalComponent implements OnInit {
  private ingredients: Ingredient[] = this.localStorageService.getItem(localStorageKeys.DEFAULT_INGREDIENTS);
  @Output() private closeEmitter: EventEmitter<any> = new EventEmitter<any>();
  private isDefaultIngredientsUiOpened = false;
  private newIngredient: Ingredient;
  private ingredientSearchValue = '';
  private ingredientSuggestionVisible = false;
  private errorIngredientAlreadyDefault = false;

  constructor(private localStorageService: LocalStorageService, private translationService: TranslationService,
              private typesMappingService: TypesMappingService, private dataService: DataService,
              private defaultIngredientService: DefaultIngredientService) { }

  ngOnInit() {
    this.newIngredient = new Ingredient('', 0, '', -1);
  }

  removeIngredient(label: string): void {
    this.ingredients = this.ingredients.filter(ingredient => ingredient.label !== label);
  }

  private updateNewIngredient(ingredientId: number) {
    this.newIngredient.id = ingredientId;
    this.ingredientSearchValue = this.translationService.translate(this.typesMappingService.getRecipeNameById(ingredientId));
  }

  private addToDefaultIngredients() {
    if (this.newIngredient.id >= 0) {
      if (!this.defaultIngredientService.isIngredientDefaultIngredient(this.newIngredient)) {
        this.defaultIngredientService.addToDefaultIngredients(this.newIngredient);
        this.ingredientSearchValue = '';
        this.newIngredient = new Ingredient('', 0, '', -1);
      } else {
        this.errorIngredientAlreadyDefault = true;
      }
    }
  }

  save(): void {
    this.closeEmitter.emit(true);
  }
}
