import { Title } from './title.class';
import { Id } from './id.class';
import { Tag } from './Tag';

export class Region extends Tag {
  constructor(title: Title, id: Id) {
    super(title, id);
  }
}
