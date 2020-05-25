import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../entity/ingredient.class';
import { localStorageKeys } from '../../../config';
import { LocalStorageService } from '../../services/local-storage.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-default-ingredient',
  templateUrl: './default-ingredient.component.html',
  styleUrls: ['./default-ingredient.component.less'],

  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class DefaultIngredientComponent implements OnInit {
  private defaultIngredients!: Ingredient[];
  private showNewIngredientInput = false;
  private newIngredient: string = '';

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.defaultIngredients = this.localStorageService.getItem(localStorageKeys.USER_BASIC_INGREDIENTS);
  }

  removeFromBasicIngredients(label: string): void {
    this.defaultIngredients = this.localStorageService.removeFromUserBasicIngredients(label);
  }

  toggleInput(): void {
    this.showNewIngredientInput = !this.showNewIngredientInput;
  }

  addNewIngredient(): void {
    if (this.newIngredient == '' || this.newIngredient.length < 1) {
      return;
    }

    const ingredient = Ingredient.createBasic(this.newIngredient);

    // To prevent the user from adding the same ingredient again
    if (this.defaultIngredients.find(ing => ing.label === ingredient.label)) {
      return;
    }

    this.defaultIngredients = this.localStorageService.addToUserBasicIngredients(ingredient);
    this.newIngredient = '';
  }
}
