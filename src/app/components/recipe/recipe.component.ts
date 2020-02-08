import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { InputPlusListComponent } from '../input-plus-list/input-plus-list.component';
import { Ingredient } from '../../entity/ingredient.class';
import { Recipe } from '../../entity/recipe';
import { Title } from '../../entity/title.class';
import { PreparationTime } from '../../entity/preparation-time.class';
import { Instructions } from '../../entity/instructions.class';
import { Region } from '../../entity/region.enum';
import { Category } from '../../entity/category.enum';
import { Id } from '../../entity/id.class';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less'],
})
export class RecipeComponent implements AfterViewInit {
  @ViewChild(InputPlusListComponent, { static: false }) private childReference: InputPlusListComponent;

  private fileCategories: string[] = [];
  private fileRegions: string[] = [];

  public ingredients: Ingredient[] = [];
  public title: string;
  public description: string;
  public region: Region[];
  public category: Category[];
  public preparationTime: number;
  public instructions: string;

  constructor(private readonly translationService: TranslationService) {
    this.fileCategories = Object.values(Category).map(category => this.getTranslatedWord(category));
    this.fileRegions = Object.values(Region).map(region => this.getTranslatedWord(region));
  }

  ngAfterViewInit() {
  }

  private getTranslatedWord(word: string): string {
    let translatedWord = this.translationService.translate(word);
    if (!translatedWord) {
      translatedWord = '';
    }
    return translatedWord;
  }

  validRecipe(): boolean {
    return false;
  }

  saveRecipe() {
    for (let i = 0; i < this.childReference.inputs.length; i++) {
      // @ts-ignore
      const { label, amount, suffix } = this.childReference.inputs.get(i)._view.nodes[1].instance;
      this.ingredients.push(new Ingredient(label, amount, suffix));
    }

    const id = Id.fromNumber(Id.generate());
    const title = Title.create(this.title);
    const preparationTime = PreparationTime.create(this.preparationTime);
    const instructions = Instructions.create(this.instructions);

    const recipe = new Recipe(id, title, preparationTime, this.category, this.region, this.ingredients, instructions, '');

    console.log(recipe);
  }
}
