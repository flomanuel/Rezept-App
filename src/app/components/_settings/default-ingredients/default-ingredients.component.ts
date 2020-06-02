import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Ingredient } from '../../../entity/ingredient.class';
import { TranslationService } from '../../../services/translation.service';
import { TypesMappingService } from '../../../services/types-mapping.service';
import { DataService } from '../../../services/data.service';
import { DefaultIngredientService } from '../../../services/default-ingredient.service';

@Component({
  selector: 'app-default-ingredients',
  templateUrl: './default-ingredients.component.html',
  styleUrls: ['./default-ingredients.component.less'],
})
export class DefaultIngredientsComponent implements OnInit {

  private isDefaultIngredientsUiOpened = false;
  private newIngredient: Ingredient;
  private ingredientSearchValue = '';
  private ingredientSuggestionVisible = false;
  private errorIngredientAlreadyDefault = false;

  constructor(private localStorageService: LocalStorageService, private translationService: TranslationService,
              private typesMappingService: TypesMappingService, private dataService: DataService,
              private defaultIngredientService: DefaultIngredientService) {
    this.newIngredient = Ingredient.createBasic('');
  }

  ngOnInit() {
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
        this.newIngredient = Ingredient.createBasic('');
      } else {
        this.errorIngredientAlreadyDefault = true;
      }
    }
  }

  onDefaultIngredientsUiOpenedChange() {
    this.isDefaultIngredientsUiOpened = !this.isDefaultIngredientsUiOpened;
  }
}
