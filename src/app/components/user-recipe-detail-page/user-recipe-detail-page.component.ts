import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { TranslationService } from '../../services/translation.service';
import { categories, PopupType, regions } from '../../types';
import { Ingredient } from '../../entity/ingredient.class';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-user-recipe-detail-page',
  templateUrl: './user-recipe-detail-page.component.html',
  styleUrls: ['./user-recipe-detail-page.component.less'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class UserRecipeDetailPageComponent implements OnInit {
  @Input() private recipe!: Recipe;

  @Output() private closeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  private popupType: PopupType = PopupType.SUCCESS;
  private showPopup = false;

  constructor(
    private readonly translationService: TranslationService,
    private readonly shoppingListService: ShoppingListService,
  ) {
  }

  ngOnInit() {
  }

  get translatedRegions(): string[] {
    return this.recipe.region.reduce((regionList: string[], region) => {
      regionList.push(this.translationService.translate(regions[region]));
      return regionList;
    }, []);
  }

  get translatedCategories(): string[] {
    return this.recipe.category.reduce((categoryList: string[], category) => {
      categoryList.push(this.translationService.translate(categories[category]));
      return categoryList;
    }, []);
  }

  addToShoppingList(ingredient: Ingredient): void {
    this.shoppingListService.addIngredientToPrivateShoppingList(ingredient);
    this.showPopup = true;
    setInterval(() => {
      this.showPopup = false;
    }, 2000);
  }

  private emitClose(): void {
    this.closeEmitter.emit(false);
  }
}
