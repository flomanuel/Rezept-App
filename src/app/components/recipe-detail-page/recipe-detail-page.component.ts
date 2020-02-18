import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Recipe} from '../../entity/recipe';

@Component({
  selector: 'app-recipedetailpage',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.less']
})
export class RecipedetailpageComponent implements OnInit {
  public recipe: Recipe;
  public index: number;

  constructor(private dataService: DataService) {
    this.index = 0;
  }

  ngOnInit() {
    document.body.style.margin = '0';
  }

  SetRecipe(recipe: Recipe): void {
  this.recipe = recipe;
}

  SetFavorite(recipe: Recipe): void {

      this.recipe.ChangeFavoriteState();
  }
}
