import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../entity/Tag';
import {DataService} from '../../services/data.service';
import {IngredientInfoService} from '../../services/ingredient-info.service';

@Component({
  selector: 'app-ingredient-additional-information',
  templateUrl: './ingredient-additional-information.component.html',
  styleUrls: ['./ingredient-additional-information.component.css']
})
export class IngredientAdditionalInformationComponent implements OnInit {

  constructor(private ingredientInfo: IngredientInfoService, private additionalInfo) {
  }

  ngOnInit() {
  }

}
