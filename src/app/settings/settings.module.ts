import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent,
      },
    ]),
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
