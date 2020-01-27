import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  public title: string;

  constructor() {}

  doShit() {
    console.log(this.title);
  }
}
