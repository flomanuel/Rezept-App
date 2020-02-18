import { Tag } from './Tag';
import { Title } from './title.class';
import { Id } from './id.class';

export class Region extends Tag {
  constructor(title: Title, id: Id) {
    super(title, id);
  }
}
