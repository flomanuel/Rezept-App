import { Component } from '@angular/core';
import { Ingredient } from '../../../entity/ingredient.class';

@Component({
  selector: 'app-basic-ingredient',
  templateUrl: './basic-ingredient.component.html',
  styleUrls: ['./basic-ingredient.component.less']
})
export class BasicIngredientComponent {
  private ingredient: Ingredient;

  constructor() { }

}
