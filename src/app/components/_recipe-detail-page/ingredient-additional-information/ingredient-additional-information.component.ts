import { Component, OnInit } from '@angular/core';
import { IngredientInfoService } from '../../../services/ingredient-info.service';
import { ActivatedRoute } from '@angular/router';
import { IngredientAdditionalInfoClass } from '../../../entity/ingredient.additional-info.class';

@Component({
  selector: 'app-ingredient-additional-information',
  templateUrl: './ingredient-additional-information.component.html',
  styleUrls: ['./ingredient-additional-information.component.less'],
})
export class IngredientAdditionalInformationComponent implements OnInit {
  private id: number;
  private info: IngredientAdditionalInfoClass[];

  constructor(public ingredientInfoService: IngredientInfoService, private getRouteParams: ActivatedRoute) {
  }

  ngOnInit() {
    this.getRouteParams.params.subscribe(params => {
      this.id = parseInt(params.id, 10);
    });
    if (typeof this.id === 'number') {
      this.ingredientInfoService.getInfoById(this.id).then((collection) => {
        collection.valueChanges().subscribe((ingredientAdditionalInfo: IngredientAdditionalInfoClass[]) => {
          this.info = ingredientAdditionalInfo;
        });
      });
    }
  }
}
