import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Ingredient } from '../../entity/ingredient.class';
import { categories, regions } from '../../types';
import { Recipe } from '../../entity/recipe';
import { ModalService } from '../../services/modal.service';
import { UserRecipeService } from '../../services/user-recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less'],
})
export class RecipeComponent {
  private readonly titleMaxLength = 75;
  private fileCategories: string[] = [];
  private fileRegions: string[] = [];

  private ingredients: Ingredient[] = [];
  private title = '';
  private description = '';
  private regions: string[] = [];
  private categories: string[] = [];
  private preparationTime: number;
  private instructions: string;
  private recipeSaved = false;
  private categoriesWereSelected = true;
  private regionsWereSelected = true;
  private tools: string[] = [];
  private allergens: string[] = [];


  public infoModalTitle: string;
  public infoModalMessage: string;

  constructor(private readonly translationService: TranslationService,
              private readonly userRecipeService: UserRecipeService,
              private readonly modalService: ModalService) {
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
      this.title.length <= this.titleMaxLength &&
      this.tools.length > 0 &&
      this.ingredients.length > 0 &&
      this.regions.length > 0 &&
      this.description &&
      this.preparationTime &&
      this.instructions &&
      this.categories.length > 0;
  }

  selectCategories(event): void {
    this.categoriesWereSelected = event.length !== 0;
    this.categories = event;
  }

  selectRegions(event): void {
    this.regionsWereSelected = event.length !== 0;
    this.regions = event;
  }

  saveRecipe(): void {
    if (!this.validRecipe()) {
      this.infoModalTitle = 'Fehler beim Speichern des Rezeptes!';
      this.infoModalMessage = 'Rezept konnte nicht gespeichert werden. ' +
        'Bitte überprüfen Sie Ihre Eingabe und gehen Sie sicher, dass sie alle Felder ausgefüllt haben.';
      this.modalService.openModal('info-modal');
      return;
    }

    // Because we only save keys
    const categoryKeys = this.categories.map(cat => {
      cat = this.translationService.getGermanMapping().category[cat];
      return parseInt(Object.keys(categories).find(key => categories[key] === cat), 10);
    });

    const regionKeys = this.regions.map(reg => {
      reg = this.translationService.getGermanMapping().region[reg];
      return parseInt(Object.keys(regions).find(key => regions[key] === reg), 10);
    });

    const recipe = new Recipe(-1, this.title, this.preparationTime, categoryKeys, regionKeys,
      this.ingredients, this.instructions, [], '', [], this.allergens, [], this.tools, this.description);

    // @ts-ignore
    document.querySelector('#recipeForm').reset();
    this.categories = [];
    this.regions = [];
    this.ingredients = [];
    this.tools = [];
    this.allergens = [];

    this.userRecipeService.saveRecipe(recipe);
    this.recipeSaved = true;
    setInterval(() => {
      this.recipeSaved = false;
    }, 3000);
  }

  openModal(id: string): void {
    this.modalService.openModal(id);
  }

  onIngredients(event: Ingredient[]): void {
    this.ingredients = event;
  }

  onTools(event: string[]): void {
    this.tools = event;
  }

  onAllergens(allergens: string[]): void {
    this.allergens = allergens;
  }
}
