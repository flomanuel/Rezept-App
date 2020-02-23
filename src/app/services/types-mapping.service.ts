import { Injectable } from '@angular/core';
import { ingredients, VolumeUnit } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TypesMappingService {

  constructor() {
  }

  getVolumeUnitByParam(param: string): string {
    return VolumeUnit[param] ? VolumeUnit[param] : '';
  }

  getRecipeNameById(id: number): string {
    return ingredients[id] ? ingredients[id] : '';
  }
}
