import { Component, OnInit } from '@angular/core';
import { IngredientInfoService } from '../../services/ingredient-info.service';

@Component({
  selector: 'app-ingredient-additional-information',
  templateUrl: './ingredient-additional-information.component.html',
  styleUrls: ['./ingredient-additional-information.component.css'],
})
export class IngredientAdditionalInformationComponent implements OnInit {

  constructor(private ingredientInfo: IngredientInfoService) {
    this.ingredientInfo.getInfoById(1).then((e) => {
      console.log(e);
    });
  }

  ngOnInit() {
  }

}
