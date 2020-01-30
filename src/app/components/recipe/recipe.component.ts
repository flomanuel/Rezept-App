import { Component } from '@angular/core';
import { Ingredient } from '../../entity/ingredient.class';
import { Category } from '../../entity/category.enum';
import { Region } from '../../entity/region.enum';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less'],
})
export class RecipeComponent {
  private fileCategories: string[] = [];
  private fileRegions: string[] = [];

  public title: string;
  public description: string;
  public region: string;
  public category: string;
  public preparationTime: number;

  constructor(private readonly translationService: TranslationService) {
    Object.values(Category).forEach(category => {
      const translatedWord = this.getTranslatedWord(category);
      this.fileCategories.push(translatedWord);
    });

    Object.values(Region).forEach(region => {
      const translatedWord = this.getTranslatedWord(region);
      this.fileRegions.push(translatedWord);
    });
  }

  private getTranslatedWord(word: string): string {
    let translatedWord = this.translationService.translate(word);
    if (!translatedWord) {
      translatedWord = '';
    }
    return translatedWord;
  }

  changeIngredients(ingredients: Ingredient[]): void {
    console.log(ingredients);
    // this.ingredients.push(ingredients);
  }
}
