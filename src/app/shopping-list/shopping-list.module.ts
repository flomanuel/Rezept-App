import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
      },
    ]),
  ],
  declarations: [ShoppingListComponent],
})
export class ShoppingListModule {}
