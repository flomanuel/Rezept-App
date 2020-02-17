import { Component } from '@angular/core';
import { VolumeUnit } from '../../../entity/volume-unit.enum';

@Component({
  selector: 'app-basic-ingredient',
  templateUrl: './basic-ingredient.component.html',
  styleUrls: ['./basic-ingredient.component.less'],
})
export class BasicIngredientComponent {
  private fileVolumeUnits: string[] = Object.values(VolumeUnit);

  public label: string;
  public amount: number;
  public suffix: string;

  constructor() {
  }
}
