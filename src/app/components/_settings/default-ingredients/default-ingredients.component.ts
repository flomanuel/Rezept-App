import { Component, OnInit } from '@angular/core';
import { localStorageKeys } from '../../../../config';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Ingredient } from '../../../entity/ingredient.class';
import { TranslationService } from '../../../services/translation.service';
import { TypesMappingService } from '../../../services/types-mapping.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-default-ingredients',
  templateUrl: './default-ingredients.component.html',
  styleUrls: ['./default-ingredients.component.less'],
})
export class DefaultIngredientsComponent implements OnInit {

  private isDefaultIngredientsUiOpened = false;
  private newIngredient: Ingredient;
  private ingredientSearchValue = '';
  private defaultIngredients: Ingredient[];
  private ingredientSuggestionVisible = false;
  private errorIngredientAlreadyDefault = false;

  constructor(private localStorageService: LocalStorageService, private translationService: TranslationService,
              private typesMappingService: TypesMappingService, private dataService: DataService) {
    this.defaultIngredients = this.localStorageService.getItem(localStorageKeys.DEFAULT_INGREDIENTS);
    this.newIngredient = new Ingredient('', 0, '', -1);
  }

  ngOnInit() {
  }

  private updateNewIngredient(ingredientId: number) {
    this.newIngredient.id = ingredientId;
    this.ingredientSearchValue = this.translationService.translate(this.typesMappingService.getRecipeNameById(ingredientId));
  }

  private addToDefaultIngredients() {
    if (this.newIngredient.id >= 0) {
      if (!this.isIngredientDefaultIngredient(this.newIngredient)) {
        this.defaultIngredients.push(this.newIngredient);
        this.localStorageService.setItem(localStorageKeys.DEFAULT_INGREDIENTS, this.defaultIngredients);
        this.ingredientSearchValue = '';
        this.newIngredient = new Ingredient('', 0, '', -1);
      } else {
        this.errorIngredientAlreadyDefault = true;
      }
    }
  }

  private removeIngredient(ingredient: Ingredient): void {
    this.defaultIngredients = this.defaultIngredients.filter(i => {
      return i.id !== ingredient.id;
    });
    this.localStorageService.setItem(localStorageKeys.DEFAULT_INGREDIENTS, this.defaultIngredients);
  }

  private isIngredientDefaultIngredient(ingredient: Ingredient) {
    return this.defaultIngredients.some(i => i.id === ingredient.id);
  }

  onDefaultIngredientsUiOpenedChange() {
    this.isDefaultIngredientsUiOpened = !this.isDefaultIngredientsUiOpened;
  }
}
