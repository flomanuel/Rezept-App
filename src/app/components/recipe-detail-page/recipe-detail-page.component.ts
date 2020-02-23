import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { Database } from '../../../config';
import { TypesMappingService } from '../../services/types-mapping.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-recipedetailpage',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.less'],
})
export class RecipeDetailPageComponent implements OnInit {

  private recipe: Recipe;

  // @Input() 'recipe': Recipe[];

  constructor(private db: AngularFirestore, private typesMapper: TypesMappingService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    document.body.style.margin = '0';
    this.getNewRecipe().then((collection) => {
      collection.valueChanges().subscribe((snapshots: Recipe[]) => {
        this.recipe = snapshots[0];
      });
    });
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
}
