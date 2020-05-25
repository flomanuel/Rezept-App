import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../entity/recipe';
import { Ingredient } from '../../../entity/ingredient.class';
import { FridgeService } from '../../../services/fridge.service';
import { DefaultIngredientService } from '../../../services/default-ingredient.service';

@Component({
  selector: 'app-recipe-list-element',
  templateUrl: './recipe-list-element.component.html',
  styleUrls: ['./recipe-list-element.component.less'],
})
export class RecipeListElementComponent implements OnInit {
  @Input() recipe: Recipe;

  private fallbackImagePath = '../../../../assets/objects/fallbackImage.svg';

  constructor(private fridgeService: FridgeService, private defaultIngredientService: DefaultIngredientService) {
  }

  ngOnInit() {
  }


  get amountMissingIngredients(): number {
    let missing = 0;
    this.recipe.ingredients.forEach((ingredient) => {
      if (!this.isIngredientAvailable(ingredient)) {
        missing++;
      }
    });
    return missing;
  }


  isIngredientAvailable(ingredient: Ingredient): boolean {
    const availabilityStatus = this.fridgeService.isIngredientInFridge(
      ingredient) || this.defaultIngredientService.isIngredientDefaultIngredient(ingredient,
    );
    // todo: implement check in shopping list to only display ingredients that are not available
    ingredient.done = availabilityStatus;
    return availabilityStatus;
  }

  calculatePreparationTime(time: number): number[] {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return [hours, minutes];
  }
}
