import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputPlusListComponent } from './components/input-plus-list/input-plus-list.component';
import { BasicIngredientComponent } from './components/input-plus-list/basic-ingredient/basic-ingredient.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { RecipeListElementComponent } from './components/recipe-list-element/recipe-list-element.component';
import { SearchPageFilterTabComponent } from './components/search-page-filter-tab/search-page-filter-tab.component';
import { HeaderBarComponent } from './components/_shared/header-bar/header-bar.component';
import { RecipeDetailPageComponent } from './components/recipe-detail-page/recipe-detail-page.component';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';
import { OpenFoodFactsDetailpageComponent } from './components/open-food-facts-detailpage/open-food-facts-detailpage.component';
import { MarketSearchComponent } from './components/market-search/market-search.component';
import {
  IngredientAdditionalInformationComponent,
} from './components/_recipe-detail-page/ingredient-additional-information/ingredient-additional-information.component';
import { LoadingAnimationComponent } from './components/_shared/loading-animation/loading-animation.component';
import { PopupComponent } from './components/_shared/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageGalleryComponent } from './components/_shared/image-gallery/image-gallery.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import {
  CookingStepsDetailPageComponent,
} from './components/_recipe-detail-page/cooking-steps-detail-page/cooking-steps-detail-page.component';
import { MultiselectModalComponent } from './components/multiselect-modal/multiselect-modal.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';

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
    component: SearchPageComponent,
  },
  {
    path: 'barcode-scanner',
    component: BarcodeScannerComponent,
  },
  {
    path: 'food-facts/:ean',
    component: OpenFoodFactsDetailpageComponent,
  },
  {
    path: 'markets',
    component: MarketSearchComponent,
  },
  {
    path: 'recipe-detail-page',
    component: RecipeDetailPageComponent,
  },
  {
    path: 'cooking-steps',
    component: CookingStepsDetailPageComponent,
  },
  {
    path: 'ingredient-information',
    component: IngredientAdditionalInformationComponent,
  },
  {
    path: 'shopping_list',
    component: ShoppingListComponent,
  },
  {
    // this should always be the last entry since otherwise all paths get mapped to the homepage
    path: '**',
    component: HomePageComponent,
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
    RecipeDetailPageComponent,
    ShoppingListComponent,
    BarcodeScannerComponent,
    OpenFoodFactsDetailpageComponent,
    MarketSearchComponent,
    IngredientAdditionalInformationComponent,
    LoadingAnimationComponent,
    ImageGalleryComponent,
    PopupComponent,
    CookingStepsDetailPageComponent,
    MultiselectModalComponent,
    InfoModalComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BasicIngredientComponent,
  ],
})
export class AppModule {
}
