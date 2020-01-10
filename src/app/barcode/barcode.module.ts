import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BarcodeComponent } from './barcode.component';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: BarcodeComponent,
      },
    ]),
  ],
  declarations: [BarcodeComponent],
})
export class BarcodeModule {}
