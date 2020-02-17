export class Title {
  private _title: string;

  private constructor() {
  }

  static create(title: string): Title {
    const instance = new Title();
    instance._title = title;
    return instance;
  }

  get title(): string {
    return this._title;
  }
}
