import { Tag } from './Tag';
import { Title } from './title.class';
import { Id } from './id.class';

export class Ingredient extends Tag {
  missing: boolean;

  constructor(title: Title, id: Id) {
    super(title, id);
    this.missing = false;
  }

  public AddMissing(): void {
    this.missing = !this.missing;
  }
}
