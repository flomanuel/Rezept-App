import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {RecipeListElementComponent} from './components/recipe-list-element/recipe-list-element.component';
import {SearchPageFilterTabComponent} from './components/search-page-filter-tab/search-page-filter-tab.component';
import {HeaderBarComponent} from './components/header-bar/header-bar.component';
import {BarcodeScannerComponent} from './components/barcode-scanner/barcode-scanner.component';
import {OpenFoodFactsDetailpageComponent} from './components/open-food-facts-detailpage/open-food-facts-detailpage.component';

const appRoutes: Routes = [
  {
    path: 'new_recipe',
    component: RecipeComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'barcode-scanner',
    component: BarcodeScannerComponent
  },
  {
    path: 'food-facts/:ean',
    component: OpenFoodFactsDetailpageComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    HomePageComponent,
    SearchPageComponent,
    RecipeListElementComponent,
    SearchPageFilterTabComponent,
    HeaderBarComponent,
    BarcodeScannerComponent,
    OpenFoodFactsDetailpageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
