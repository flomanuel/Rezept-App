import { Component, ViewChild } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { InputPlusListComponent } from '../input-plus-list/input-plus-list.component';
import { Ingredient } from '../../entity/ingredient.class';
import { Title } from '../../entity/title.class';
import { PreparationTime } from '../../entity/preparation-time.class';
import { Instructions } from '../../entity/instructions.class';
import { Categories, Regions } from '../../types';
import { Id } from '../../entity/id.class';
import { LocalStorageService } from '../../services/local-storage.service';
import { Recipe } from '../../entity/recipe';
import { Video } from '../../entity/video.class';
import { Category } from '../../entity/category.class';
import { Region } from '../../entity/region.class';

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
  public regions: Regions[] = [];
  public categories: Categories[] = [];
  public preparationTime: number;
  public instructions: string;

  constructor(private readonly translationService: TranslationService, private readonly localStorageService: LocalStorageService) {
    this.fileCategories = Object.values(Categories).map(category => this.getTranslatedWord(category));
    this.fileRegions = Object.values(Regions).map(region => this.getTranslatedWord(region));
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
      const { label, amount, suffix } = this.childReference.inputs.get(i)._view.nodes[1].instance;
      this.ingredients.push(new Ingredient(label, amount, suffix, 0));
    }

    const id = Id.fromNumber(Id.generate());
    const title = Title.create(this.title);
    const preparationTime = PreparationTime.create(this.preparationTime);
    const instructions = Instructions.create(this.instructions);
    const categories = this.categories.map(cat => Category.create(cat));
    const regions = this.regions.map(reg => Region.create(reg));

    const recipe = new Recipe(id, title, preparationTime, categories, regions, this.ingredients, instructions, [], Video.create(''));

    // @ts-ignore
    document.querySelector('#recipeForm').reset();

    this.localStorageService.addToRecipes(recipe);
  }
}
