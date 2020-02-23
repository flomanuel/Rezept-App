import { Component, ViewChild } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { InputPlusListComponent } from '../input-plus-list/input-plus-list.component';
import { Ingredient } from '../../entity/ingredient.class';
import { categories, regions, VolumeUnit } from '../../types';
import { LocalStorageService } from '../../services/local-storage.service';
import { Recipe } from '../../entity/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less'],
})
export class RecipeComponent {
  @ViewChild(InputPlusListComponent, { static: false }) private childReference: InputPlusListComponent;

  private fileCategories: string[] = [];
  private fileRegions: string[] = [];

  public ingredients: Ingredient[] = [];
  public title: string;
  public description: string;
  public regions: number[] = [];
  public categories: number[] = [];
  public preparationTime: number;
  public instructions: string;
  public recipeSaved = false;

  constructor(private readonly translationService: TranslationService, private readonly localStorageService: LocalStorageService) {
    this.fileCategories = Object.values(categories).map(category => this.getTranslatedWord(category));
    this.fileRegions = Object.values(regions).map(region => this.getTranslatedWord(region));
  }

  private getTranslatedWord(word: string): string {
    let translatedWord = this.translationService.translate(word);
    if (!translatedWord) {
      translatedWord = '';
    }
    return translatedWord;
  }

  validRecipe(): boolean {
    return this.title &&
      this.regions.length >= 1 &&
      this.description &&
      this.preparationTime &&
      this.categories.length >= 1;
  }

  saveRecipe(): void {
    for (let i = 0; i < this.childReference.inputs.length; i++) {
      // @ts-ignore
      const { label, amount } = this.childReference.inputs.get(i)._view.nodes[1].instance;
      this.ingredients.push(new Ingredient(label, amount, VolumeUnit.GRAMM, 1, 0));
    }

    const id = Math.floor(Math.random() * 9000);

    const recipe = new Recipe(id, this.title, this.preparationTime, this.categories, this.regions,
      this.ingredients, this.instructions, [], '');

    // @ts-ignore
    document.querySelector('#recipeForm').reset();

    this.localStorageService.addToRecipes(recipe);
    this.recipeSaved = true;
    setInterval(() => {
      this.recipeSaved = false;
    }, 3000);
  }
}
