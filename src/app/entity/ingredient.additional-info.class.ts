import { IngredientNutritionClass } from './ingredient.nutrition.class';

export class IngredientAdditionalInfoClass {
  constructor(public description: string, public id: number, public title: string, public nutrition: IngredientNutritionClass) {
  }
}
