import {Tag} from './Tag';
import construct = Reflect.construct;

export class Ingredient extends Tag {
  constructor(title: string, id: number) {
    super(title, id);
  }
}
