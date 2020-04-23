import { Component, OnInit } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { TranslationService } from '../../services/translation.service';
import { ingredients, VolumeUnit } from '../../types';

@Component({
  selector: 'app-fridge-detail-page',
  templateUrl: './fridge-detail-page.component.html',
  styleUrls: ['./fridge-detail-page.component.less'],
})
export class FridgeDetailPageComponent implements OnInit {
  private ingredients = ingredients;
  public volumeUnits: string[];


  constructor(private fridgeService: FridgeService, private translationService: TranslationService) {
    this.volumeUnits = Object.values(VolumeUnit);
  }

  ngOnInit() {
  }

}
