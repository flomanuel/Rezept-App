import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { TimeService } from '../../services/time.service';
import { UserRecipeService } from '../../services/user-recipe.service';

@Component({
  selector: 'app-created-recipe-list',
  templateUrl: './created-recipe-list.component.html',
  styleUrls: ['./created-recipe-list.component.less'],
})
export class CreatedRecipeListComponent implements OnInit {
  private showModal = false;
  private createdRecipes: Recipe[];
  private deleteModalMessage: string;
  private chosenRecipe: Recipe = null;
  private shouldShowDetails = false;
  private selectedRecipe: Recipe = null;

  constructor(private readonly userRecipeService: UserRecipeService, private readonly timeService: TimeService) {
  }

  ngOnInit() {
    this.createdRecipes = this.userRecipeService.allRecipes;
  }

  showDetails(recipe: Recipe): void {
    this.selectedRecipe = recipe;
    this.shouldShowDetails = true;
  }

  closeDetails(): void {
    this.shouldShowDetails = false;
  }

  showDeleteModalFor(chosenRecipe: Recipe): void {
    this.chosenRecipe = chosenRecipe;
    this.deleteModalMessage = `Sind Sie sicher dass sie das Rezept "${chosenRecipe.title}" entfernen möchten?`;
    this.showModal = true;
  }

  onUserDeleteChoice(userWillDeleteRecipe: boolean): void {
    this.showModal = false;
    if (userWillDeleteRecipe) {
      this.createdRecipes = this.userRecipeService.deleteRecipe(this.chosenRecipe);
    }
  }
}
