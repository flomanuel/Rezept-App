import {Tag} from './Tag';
import construct = Reflect.construct;

export class Ingredient extends Tag {
  missing: boolean;
  constructor(title: string, id: number) {
    super(title, id);
    this.missing = false;
  }

  public AddMissing(): void {
    this.missing = !this.missing;
  }
}
