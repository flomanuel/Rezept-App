import { Injectable } from '@angular/core';
import { VolumeUnit } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TypesMapperService {

  constructor() {
  }

  getVolumeUnitByParam(param: string): string {
    return VolumeUnit[param] ? VolumeUnit[param] : '';
  }
}
