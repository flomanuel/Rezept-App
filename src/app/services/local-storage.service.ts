import { Recipe } from '../entity/recipe';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  addToRecipes(recipe: Recipe): void {
    const recipes = this.getItem('recipes') || [];
    recipes.push(recipe);
    this.setItem('recipes', recipes);
  }

  getItem(key: string): any[] {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  setItem(key: string, value: any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
