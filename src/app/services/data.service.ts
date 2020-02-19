import { Injectable } from '@angular/core';
import { Tag } from '../entity/Tag';
import { Ingredient } from '../entity/ingredient.class';
import { Id } from '../entity/id.class';
import { Title } from '../entity/title.class';
import { PreparationTime } from '../entity/preparation-time.class';
import { Instructions } from '../entity/instructions.class';
import { Recipe } from '../entity/recipe';
import { Video } from '../entity/video.class';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tagList: any[] = [];
  searchResult: Recipe[] = [];

  constructor() {
    this.tagList.push(new Ingredient('Pfeffer', 1, 'el', 0));
    this.tagList.push(new Ingredient('Salz', 2, 'el', 0));
    this.tagList.push(new Ingredient('Apfel', 3, 'Stk', 0));
    this.tagList.push(new Ingredient('Schinken', 4, 'g', 0));

    this.searchResult.push(new Recipe(
      Id.fromNumber(Id.generate()),
      Title.create('Pizza'),
      PreparationTime.create(130),
      [],
      [],
      [new Ingredient('Test', 2, 'el', 0)],
      Instructions.create(''),
      [],
      Video.create('')));
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
