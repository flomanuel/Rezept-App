import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FridgeComponent } from './fridge.component';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FridgeComponent,
      },
    ]),
  ],
  declarations: [FridgeComponent],
})
export class FridgeModule {}
