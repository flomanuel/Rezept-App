import { Recipe } from '../entity/recipe';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  addToRecipes(recipe: Recipe): void {
    const recipes = this.getItem('created-recipes');
    recipes.push(recipe);
    this.setItem('created-recipes', recipes);
  }

  getItem(key: string): any[] {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  setItem(key: string, value: any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
