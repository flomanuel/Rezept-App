import { VolumeUnit } from '../types';

export class Ingredient {

  constructor(public label: string, public amount: number, public volumeUnit: string, public id: number,
              public customTitle: string = '', public additionalInfo: boolean = false, public done: boolean = false,
              public saved: boolean = false) {
  }

  static createBasic(customTitle: string): Ingredient {
    return new Ingredient('', 0, VolumeUnit.GRAMM, -1, customTitle);
  }

  amountSmallerThan(ingredient: Ingredient): boolean {
    if (this.volumeUnit !== ingredient.volumeUnit) {
      throw new Error(`Cannot compare volume unit ${this.volumeUnit} to ${ingredient.volumeUnit}`);
    }

    return this.amount < ingredient.amount;
  }
}
