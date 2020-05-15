import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../../../entity/ingredient.class';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { localStorageKeys } from '../../../../../config';

@Component({
  selector: 'app-ingredient-setup-modal',
  templateUrl: './ingredient-setup-modal.component.html',
  styleUrls: ['./ingredient-setup-modal.component.less']
})
export class IngredientSetupModalComponent implements OnInit {
  private ingredients: Ingredient[] = this.localStorageService.getItem(localStorageKeys.USER_BASIC_INGREDIENTS);
  @Output() private closeEmitter: EventEmitter<any> = new EventEmitter<any>();
  newIngredient: any = '';

  constructor(private readonly localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  removeIngredient(label: string): void {
    this.ingredients = this.ingredients.filter(ingredient => ingredient.label !== label);
  }

  addIngredient(): void {
    if (this.newIngredient.trim() !== '') {
      this.ingredients.unshift(new Ingredient(this.newIngredient, 0, '', 0));
      this.newIngredient = '';
    }
  }

  save(): void {
    this.localStorageService.setItem(localStorageKeys.USER_BASIC_INGREDIENTS, this.ingredients);
    this.closeEmitter.emit(true);
  }
}
