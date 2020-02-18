import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {InputPlusListComponent} from './components/input-plus-list/input-plus-list.component';
import {BasicIngredientComponent} from './components/input-plus-list/basic-ingredient/basic-ingredient.component';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {RecipeListElementComponent} from './components/recipe-list-element/recipe-list-element.component';
import {SearchPageFilterTabComponent} from './components/search-page-filter-tab/search-page-filter-tab.component';
import {HeaderBarComponent} from './components/header-bar/header-bar.component';
import {RecipedetailpageComponent} from './components/recipe-detail-page/recipe-detail-page.component';
import {BarcodeScannerComponent} from './components/barcode-scanner/barcode-scanner.component';
import {OpenFoodFactsDetailpageComponent} from './components/open-food-facts-detailpage/open-food-facts-detailpage.component';
import {MarketSearchComponent} from './components/market-search/market-search.component';
import { IngredientAdditionalInformationComponent } from './components/ingredient-additional-information/ingredient-additional-information.component';

const appRoutes: Routes = [
  {
    path: 'new_recipe',
    component: RecipeComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
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
  {
    path: 'markets',
    component: MarketSearchComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    AppComponent,
    HomePageComponent,
    InputPlusListComponent,
    BasicIngredientComponent,
    HomePageComponent,
    SearchPageComponent,
    RecipeListElementComponent,
    SearchPageFilterTabComponent,
    HeaderBarComponent,
    RecipedetailpageComponent,
    BarcodeScannerComponent,
    OpenFoodFactsDetailpageComponent,
    MarketSearchComponent,
    IngredientAdditionalInformationComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BasicIngredientComponent,
  ],
})
export class AppModule {
}
