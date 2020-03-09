import { Component, ViewChild } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { InputPlusListComponent } from '../input-plus-list/input-plus-list.component';
import { Ingredient } from '../../entity/ingredient.class';
import { categories, regions } from '../../types';
import { LocalStorageService } from '../../services/local-storage.service';
import { Recipe } from '../../entity/recipe';
import { ModalService } from '../../services/modal.service';

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
  public title = '';
  public description: string;
  public regions: string[] = [];
  public categories: string[] = [];
  public preparationTime: number;
  public instructions: string;
  public recipeSaved = false;
  public error: any = false;
  public categoriesWereSelected = true;
  public regionsWereSelected = true;

  public infoModalTitle: string;
  public infoModalMessage: string;

  constructor(private readonly translationService: TranslationService,
              private readonly localStorageService: LocalStorageService,
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

    for (let i = 0; i < this.childReference.inputs.length; i++) {
      // @ts-ignore
      const { label, amount, suffix } = this.childReference.inputs.get(i)._view.nodes[1].instance;
      this.ingredients.push(new Ingredient(label, amount, suffix, 0));
    }

    if (this.ingredients.length === 0) {
      this.infoModalTitle = 'Fehler beim Speichern des Rezeptes!';
      this.infoModalMessage = 'Bitte geben Sie die Zutaten zu Ihrem Rezept an.';
      this.modalService.openModal('info-modal');
      return;
    }

    const id = Math.floor(Math.random() * 9000);

    const categoryKeys = this.categories.map(cat => {
      cat = this.translationService.getGermanMapping().category[cat];
      return parseInt(Object.keys(categories).find(key => categories[key] === cat), 10);
    });

    const regionKeys = this.regions.map(reg => {
      reg = this.translationService.getGermanMapping().region[reg];
      return parseInt(Object.keys(regions).find(key => regions[key] === reg), 10);
    });

    const recipe = new Recipe(id, this.title, this.preparationTime, categoryKeys, regionKeys,
      this.ingredients, this.instructions, [], '');

    // @ts-ignore
    document.querySelector('#recipeForm').reset();
    this.categories = [];
    this.regions = [];

    this.localStorageService.addToRecipes(recipe);
    this.recipeSaved = true;
    setInterval(() => {
      this.recipeSaved = false;
      window.location.reload(); // Is needed because ingredients wont be reset...
    }, 3000);
  }

  openModal(id: string) {
    this.modalService.openModal(id);
  }
}
