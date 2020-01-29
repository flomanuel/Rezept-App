import {Injectable} from '@angular/core';
import {Tag} from '../entity/Tag';
import {Ingredient} from '../entity/Ingredient';
import {Recipe} from '../entity/Recipe';
import {Category} from '../entity/category.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tagList: Tag[] = [];
  searchResult: Recipe[] = [];

  constructor() {
    this.tagList.push(new Ingredient('Pfeffer', 1));
    this.tagList.push(new Ingredient('Salz', 2));
    this.tagList.push(new Ingredient('Apfel', 3));
    this.tagList.push(new Ingredient('Schinken', 4));

    this.searchResult.push(new Recipe(1, 'Pizza', 130, [], [], [], '', ''));
    this.searchResult.push(new Recipe(2, 'Spaghetti', 1, [], [], [], '', ''));
    this.searchResult.push(new Recipe(3, 'Bacon', 1, [], [], [], '', ''));
  }

  getTagsBySearchString(searchValue: string) {
    if (searchValue && searchValue !== '') {
      return this.tagList.filter(
        tag => tag.title.toLowerCase().includes(searchValue.toLowerCase()));
    }
    return [];
  }

  searchRecipesByParams(params: Tag[]): Recipe[] {
    if (params.length > 0) {
      return this.searchResult;
    }
    return [];
  }
}
