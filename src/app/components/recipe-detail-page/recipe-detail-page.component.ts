import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { Database } from '../../../config';
import { TypesMappingService } from '../../services/types-mapping.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NavigationExtras, Router } from '@angular/router';
import { IngredientInfoService } from '../../services/ingredient-info.service';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-recipedetailpage',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.less'],
})
export class RecipeDetailPageComponent implements OnInit, OnDestroy {

  // @Input() 'recipe': Recipe[];

  private recipe: Recipe;
  private cookingSteps = false;


  constructor(private db: AngularFirestore,
              private typesMapper: TypesMappingService,
              private localStorageService: LocalStorageService,
              private ingredientInfoService: IngredientInfoService,
              private translationService: TranslationService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
    document.body.style.margin = '0';
    this.getNewRecipe().then((collection) => {
      collection.valueChanges().subscribe((snapshots: Recipe[]) => {
        this.recipe = snapshots[0];
      });
    });
  }

  ngOnDestroy() {
    document.body.style.margin = '8px';
  }

  getNewRecipe() {
    return new Promise<any>((resolve) => {
      const collection = this.db.collection(Database.RECIPES, ref => ref.where('title', '==', 'Suppe1'));
      resolve(collection);
    });
  }

  toggleFavouriteRecipe() {
    const id = this.recipe.id;
    if (this.localStorageService.isRecipeFavoured(id)) {
      this.localStorageService.removeFromFavouriteRecipes(id);
    } else {
      this.localStorageService.addToFavouriteRecipes(id);
    }
  }

  calculatePreparationTime(format: string) {
    const time = this.recipe.preparationTime;
    if (format === 'h') {
      return Math.trunc(time / 60);
    }

    if (format === 'm') {
      return time % 60;
    }
  }

  openCookingSteps() {
    this.router.navigate(['cooking-steps'], {
        queryParams: {
          recipe: JSON.stringify(this.recipe),
        },
      },
    );
  }

  showIngredientInfo(infoID: number) {
    if (infoID > 0) {
      this.router.navigate(['ingredient-information'], {
          queryParams: {
            id: infoID,
          },
        },
      );
    }
  }
}
