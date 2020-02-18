import {Tag} from './Tag';
import construct = Reflect.construct;
import { VolumeUnit } from './volume-unit.enum';

export class Ingredient extends Tag {
  missing: boolean;
  constructor(title: string, id: number, public amount: number, public unit: VolumeUnit) {
    super(title, id);
    this.missing = false;
  }

  public AddMissing(): void {
    this.missing = !this.missing;
  }
}
