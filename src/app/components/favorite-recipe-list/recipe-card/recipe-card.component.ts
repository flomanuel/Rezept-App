import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../entity/recipe';
import { categories, regions } from '../../../types';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.less'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Output() recipeIdToDelete: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor(private readonly translationService: TranslationService) {
  }

  ngOnInit() {
  }

  private getMappedAndTranslatedRegionsFromRecipe(regs: number[]): string[] {
    return regs.reduce((newRegions, reg) => {
      const translated = this.translationService.translate(regions[reg]);
      newRegions.push(translated);
      return newRegions;
    }, []);
  }

  private getMappedAndTranslatedCategoriesFromRecipe(cats: number[]): string[] {
    return cats.reduce((newRegions, cat) => {
      const translated = this.translationService.translate(categories[cat]);
      newRegions.push(translated);
      return newRegions;
    }, []);
  }

  onRemove(recipe: Recipe) {
    this.recipeIdToDelete.emit(recipe);
  }
}
