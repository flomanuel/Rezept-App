import { IngredientNutrition } from './ingredientNutrition';

export interface IngredientAdditionalInfoClass {
  description: string;
  id: number;
  title: string;
  nutrition: IngredientNutrition;
}
