import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { regions, ingredients, categories } from '../../types';
import { TranslationService } from '../../services/translation.service';
import { TypesMappingService } from '../../services/types-mapping.service';
import { FirebaseService } from '../../services/firebase.service';
import { Recipe } from '../../entity/recipe';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less'],
})
export class SearchPageComponent implements OnInit {
  private ingredientIds: number[] = [];
  private tabElements = { regionsIds: [], categoriesIds: [] };
  private selectedFilterTabElements: number[] = [];
  private defaultIngredientsStatus = false;
  private ingredients = ingredients;
  private searchResult: Recipe[] = [];

  constructor(private firebaseService: FirebaseService, private dataService: DataService, private translationService: TranslationService) {
    for (const index in regions) {
      if (index in regions) {
        this.tabElements.regionsIds.push(index);
      }
    }

    for (const index in categories) {
      if (index in categories) {
        this.tabElements.categoriesIds.push(index);
      }
    }

  }

  ngOnInit() {
  }

  toggleFilterParam(id: number): boolean {
    if (this.ingredientIds && id) {
      const index = this.ingredientIds.indexOf(id);
      if (index >= 0) {
        this.ingredientIds.splice(index, 1);
        return true;
      }
      return false;
    }
  }

  searchRecipesForIngredients() {
    const filteredIds = this.ingredientIds.reduce((result: number[], currentValue: number) => {
      return result.includes(currentValue) ? result : [...result, currentValue];
    }, []);

    this.firebaseService.searchRecipesByIngredients(filteredIds).then((collection) => {
        collection.valueChanges().subscribe((recipes: Recipe[]) => {
            console.log(recipes);
            if (filteredIds.length > 1) {
              this.searchResult = recipes.reduce((result: Recipe[], currentRecipe: Recipe) => {
                if (
                  currentRecipe.ingredientsIdList.every(id => {
                    filteredIds.includes(id);
                  })
                ) {
                  return [...result, currentRecipe];
                }
                return result;
              }, []);
            } else {
              this.searchResult = recipes;
            }
          },
        );
      },
    );
  }

  onTabSelection($event: number[]): void {
    this.selectedFilterTabElements = $event;
  }

  onDefaultIngredientsChange($event: boolean) {
    this.defaultIngredientsStatus = $event;
  }
}
