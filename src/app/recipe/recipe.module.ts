import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RecipeComponent,
      },
    ]),
  ],
  declarations: [RecipeComponent],
})
export class RecipeModule {}
