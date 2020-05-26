import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputPlusListComponent } from './components/recipe/input-plus-list/input-plus-list.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { RecipeListElementComponent } from './components/_search-page/recipe-list-element/recipe-list-element.component';
import { SearchPageFilterTabComponent } from './components/_search-page/search-page-filter-tab/search-page-filter-tab.component';
import { HeaderBarComponent } from './components/_shared/header-bar/header-bar.component';
import { RecipeDetailPageComponent } from './components/recipe-detail-page/recipe-detail-page.component';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';
import { OpenFoodFactsDetailpageComponent } from './components/open-food-facts-detailpage/open-food-facts-detailpage.component';
import { MarketSearchComponent } from './components/market-search/market-search.component';
// tslint:disable-next-line:max-line-length
import { IngredientAdditionalInformationComponent } from './components/_recipe-detail-page/ingredient-additional-information/ingredient-additional-information.component';
import { LoadingAnimationComponent } from './components/_shared/loading-animation/loading-animation.component';
import { PopupComponent } from './components/_shared/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageGalleryComponent } from './components/_shared/image-gallery/image-gallery.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
// tslint:disable-next-line:max-line-length
import { CookingStepsDetailPageComponent } from './components/_recipe-detail-page/cooking-steps-detail-page/cooking-steps-detail-page.component';
import { MultiselectModalComponent } from './components/multiselect-modal/multiselect-modal.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FavoriteRecipeListComponent } from './components/favorite-recipe-list/favorite-recipe-list.component';
import { RecipeCardComponent } from './components/favorite-recipe-list/recipe-card/recipe-card.component';
import { ActionModalComponent } from './components/_shared/action-modal/action-modal.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InitialSetupComponent } from './components/initial-setup/initial-setup.component';
import { GreetingModalComponent } from './components/initial-setup/modals/greeting-modal/greeting-modal.component';
import { IngredientSetupModalComponent } from './components/initial-setup/modals/ingredient-setup-modal/ingredient-setup-modal.component';
import { FridgeDetailPageComponent } from './components/fridge-detail-page/fridge-detail-page.component';
import { DefaultIngredientsComponent } from './components/_settings/default-ingredients/default-ingredients.component';
import { CreatedRecipeListComponent } from './components/created-recipe-list/created-recipe-list.component';
import { ToolsInputPlusListComponent } from './components/recipe/tools-input-plus-list/tools-input-plus-list.component';
import { UserRecipeDetailPageComponent } from './components/user-recipe-detail-page/user-recipe-detail-page.component';

const appRoutes: Routes = [
  {
    path: 'new-recipe',
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
    path: 'recipe-detail-page/:id',
    component: RecipeDetailPageComponent,
  },
  {
    path: 'cooking-steps',
    component: CookingStepsDetailPageComponent,
  },
  {
    path: 'ingredient-information/:id',
    component: IngredientAdditionalInformationComponent,
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'my-favorite-recipes',
    component: FavoriteRecipeListComponent,
  },
  {
    path: 'fridge',
    component: FridgeDetailPageComponent,
  },
  {
    path: 'default-ingredients',
    component: DefaultIngredientsComponent,
  },
  {
    path: 'created-recipes',
    component: CreatedRecipeListComponent,
  },
  {
    // this should always be the last entry since otherwise all requests get redirected to the homepage
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
    SettingsComponent,
    FavoriteRecipeListComponent,
    RecipeCardComponent,
    ActionModalComponent,
    FridgeDetailPageComponent,
    DefaultIngredientsComponent,
    CreatedRecipeListComponent,
    ToolsInputPlusListComponent,
    InitialSetupComponent,
    GreetingModalComponent,
    IngredientSetupModalComponent,
    UserRecipeDetailPageComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
