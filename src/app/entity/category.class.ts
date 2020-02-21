export class Category {
  private _category: string;

  private constructor() {
  }

  static create(category: string): Category {
    const instance = new Category();
    instance._category = category;
    return instance;
  }

  get category(): string {
    return this._category;
  }
}
