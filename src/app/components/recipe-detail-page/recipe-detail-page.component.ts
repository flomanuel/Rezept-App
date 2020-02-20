import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../../entity/recipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { Database } from '../../../config';

@Component({
  selector: 'app-recipedetailpage',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.less'],
})
export class RecipeDetailPageComponent implements OnInit {

  private recipe: Recipe;

  @ViewChild('imageGallery', { static: false }) gallery: ElementRef;

  // @Input() 'recipe': Recipe[];

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.getNewRecipe().then((collection) => {
      collection.valueChanges().subscribe((snapshots: Recipe[]) => {
        this.recipe = snapshots[0];
      });
    });
  }

  getNewRecipe() {
    return new Promise<any>((resolve) => {
      const collection = this.db.collection(Database.RECIPES, ref => ref.where('title', '==', 'Suppe1'));
      resolve(collection);
    });
  }

  initImageGallery() {
    console.log(this.gallery);
  }
}
