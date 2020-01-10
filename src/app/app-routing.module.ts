import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then((m) => m.SearchModule) },
  { path: 'new_recipe', loadChildren: () => import('./recipe/recipe.module').then((m) => m.RecipeModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule) },
  { path: 'shopping_list', loadChildren: () => import('./shopping-list/shopping-list.module').then((m) => m.ShoppingListModule) },
  { path: 'fridge', loadChildren: () => import('./fridge/fridge.module').then((m) => m.FridgeModule) },
  { path: 'barcode', loadChildren: () => import('./barcode/barcode.module').then((m) => m.BarcodeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
