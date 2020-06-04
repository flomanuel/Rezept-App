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
import { TimeService } from '../../services/time.service';
import { PreparationTime } from '../../types';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FavoredRecipeService } from '../../services/favored-recipe.service';

@Component({
  selector: 'app-recipedetailpage',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.less'],
})
export class RecipeDetailPageComponent implements OnInit, OnDestroy {

  private amountMissingIngredients = 0;
  private recipe: Recipe;
  private ingredientAddedPrivateShoppingList = false;

  constructor(private readonly db: AngularFirestore,
              private readonly typesMapper: TypesMappingService,
              private readonly localStorageService: LocalStorageService,
              private readonly ingredientInfoService: IngredientInfoService,
              private readonly translationService: TranslationService,
              private readonly dataService: DataService,
              private readonly firebaseService: FirebaseService,
              private readonly router: Router,
              private readonly routerParams: ActivatedRoute,
              private readonly fridgeService: FridgeService,
              private readonly defaultIngredientService: DefaultIngredientService,
              private readonly timeService: TimeService,
              private readonly shoppingListService: ShoppingListService,
              private readonly favoredRecipeService: FavoredRecipeService,
  ) {
  }

  async ngOnInit() {
    document.body.style.margin = '0';

    await this.routerParams.params.subscribe(params => {
      this.firebaseService.getRecipeWithId(parseInt(params.id, 10)).then(collection => {
        collection.valueChanges().subscribe(recipe => {
          this.recipe = recipe[0];

          this.recipe.ingredients.forEach((ingredient) => {
            if (!this.isIngredientAvailable(ingredient)) {
              this.amountMissingIngredients++;
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

  toggleFavouriteRecipe(): void {
    const id = this.recipe.id;
    if (this.favoredRecipeService.isRecipeFavoured(id)) {
      this.favoredRecipeService.removeFromFavoriteRecipes(id);
    } else {
      this.favoredRecipeService.addToFavoriteRecipes(id);
    }
  }

  calculatePreparationTime(format: string): PreparationTime | number {
    return this.timeService.calculatePreparationTime(this.recipe.preparationTime, format);
  }

  openCookingSteps(): void {
    this.router.navigate(['cooking-steps'], {
        queryParams: {
          recipe: JSON.stringify(this.recipe),
        },
      },
    );
  }

  showIngredientInfo(additionalInfo: boolean, infoID: number): void {
    if (additionalInfo && infoID) {
      this.router.navigate(['ingredient-information/' + infoID],
      );
    }
  }

  addIngredientToPrivateShoppingList(ingredient: Ingredient): void {
    if (this.isIngredientAvailable(ingredient)) {
      this.shoppingListService.addIngredientToPrivateShoppingList(ingredient);
      if (!this.ingredientAddedPrivateShoppingList) {
        this.ingredientAddedPrivateShoppingList = true;

        setTimeout(() => {
          this.ingredientAddedPrivateShoppingList = false;
        }, 1750);
      }
    }
  }
}
