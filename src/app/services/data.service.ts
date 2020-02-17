import { Injectable } from '@angular/core';
import { Tag } from '../entity/Tag';
import { Ingredient } from '../entity/ingredient.class';
import { Id } from '../entity/id.class';
import { Title } from '../entity/title.class';
import { PreparationTime } from '../entity/preparation-time.class';
import { Instructions } from '../entity/instructions.class';
import { Recipe } from '../entity/recipe';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tagList: any[] = [];
  searchResult: Recipe[] = [];

  constructor() {
    this.tagList.push(new Ingredient('Pfeffer', 1, 'el'));
    this.tagList.push(new Ingredient('Salz', 2, 'el'));
    this.tagList.push(new Ingredient('Apfel', 3, 'Stk'));
    this.tagList.push(new Ingredient('Schinken', 4, 'g'));

    this.searchResult.push(new Recipe(
      Id.fromNumber(Id.generate()),
      Title.create('Pizza'),
      PreparationTime.create(130),
      [],
      [],
      [new Ingredient('Test', 2, 'el')],
      Instructions.create(''),
      ''));
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
