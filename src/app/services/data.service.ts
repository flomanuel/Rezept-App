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
    this.tagList.push(Title.create('Pfeffer'));
    this.tagList.push(Title.create('Salz'));
    this.tagList.push(Title.create('Pepperoni'));
    this.tagList.push(Title.create('Salami'));

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
        title => title.title.toLowerCase().includes(searchValue.toLowerCase()));
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
