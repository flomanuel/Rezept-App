import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { TypesMappingService } from '../../services/types-mapping.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientInfoService } from '../../services/ingredient-info.service';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';
import { Ingredient } from '../../entity/ingredient.class';
import { FirebaseService } from '../../services/firebase.service';
import { FridgeService } from '../../services/fridge.service';
import { DefaultIngredientService } from '../../services/default-ingredient.service';

@Component({
  selector: 'app-recipedetailpage',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.less'],
})
export class RecipeDetailPageComponent implements OnInit, OnDestroy {

  private missingIngredients = 0;
  private recipe: Recipe;
  private ingredientAddedPrivateShoppingList = false;

  constructor(private db: AngularFirestore,
              private typesMapper: TypesMappingService,
              private localStorageService: LocalStorageService,
              private ingredientInfoService: IngredientInfoService,
              private translationService: TranslationService,
              private dataService: DataService,
              private firebaseService: FirebaseService,
              private router: Router,
              private routerParams: ActivatedRoute,
              private fridgeService: FridgeService,
              private defaultIngredientService: DefaultIngredientService) {
  }

  async ngOnInit() {
    document.body.style.margin = '0';

    await this.routerParams.params.subscribe(params => {
      this.firebaseService.getRecipeWithId(parseInt(params.id, 10)).then(collection => {
        collection.valueChanges().subscribe(recipe => {
          this.recipe = recipe[0];

          this.recipe.ingredients.forEach((ingredient) => {
            if (!this.isIngredientAvailable(ingredient)) {
              this.missingIngredients++;
            }
          });
        });
      });
    });
  }

  ngOnDestroy() {
    document.body.style.margin = '8px';
  }

  isIngredientAvailable(ingredient: Ingredient): boolean {
    const availabilityStatus = this.fridgeService.isIngredientInFridge(
      ingredient) || this.defaultIngredientService.isIngredientDefaultIngredient(ingredient,
    );
    // todo: implement check in shopping list to only display ingredients that are not available
    ingredient.done = availabilityStatus;
    return availabilityStatus;
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

  showIngredientInfo(additionalInfo: boolean, infoID: number) {
    if (additionalInfo && infoID) {
      this.router.navigate(['ingredient-information/' + infoID],
      );
    }
  }

  addIngredientToPrivateShoppingList(ingredient: Ingredient) {
    if (this.isIngredientAvailable(ingredient)) {
      this.localStorageService.addIngredientToPrivateShoppingList(ingredient);
      if (!this.ingredientAddedPrivateShoppingList) {
        this.ingredientAddedPrivateShoppingList = true;

        setTimeout(() => {
          this.ingredientAddedPrivateShoppingList = false;
        }, 1750);
      }
    }
  }
}
