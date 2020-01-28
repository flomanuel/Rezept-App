import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IngredientListComponent } from './components/recipedetailpage/ingredient-list/ingredient-list.component';
import { RecipedetailpageComponent } from './components/recipedetailpage/recipedetailpage.component';

const appRoutes: Routes = [
  {
    path: 'new_recipe',
    component: RecipeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    AppComponent,
    HomePageComponent,
    IngredientListComponent,
    RecipedetailpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
