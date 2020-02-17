import { Title } from './title.class';
import { Id } from './id.class';

export abstract class Tag {
  constructor(public title: Title, public id: Id) {
  }
}
