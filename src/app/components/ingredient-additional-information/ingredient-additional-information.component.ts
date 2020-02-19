import { Component, OnInit } from '@angular/core';
import { IngredientInfoService } from '../../services/ingredient-info.service';
import { ActivatedRoute } from '@angular/router';
import { IngredientAdditionalInfoClass } from '../../entity/ingredient.additional-info.class';

@Component({
  selector: 'app-ingredient-additional-information',
  templateUrl: './ingredient-additional-information.component.html',
  styleUrls: ['./ingredient-additional-information.component.less'],
})
export class IngredientAdditionalInformationComponent implements OnInit {
  private id: number;
  private info: IngredientAdditionalInfoClass[];

  constructor(public _ingredientInfoService: IngredientInfoService, private getRouteParams: ActivatedRoute) {
  }

  ngOnInit() {
    this.getRouteParams.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
    });
    if (typeof this.id === 'number') {
      this._ingredientInfoService.getInfoById(this.id).then( (collection) => {
      collection.valueChanges().subscribe((snapshots: IngredientAdditionalInfoClass[]) => {
        this.info = snapshots;
        });
      });
    }
  }
}
