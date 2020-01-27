export class Recipe {
  private _title: string;
  private _ingredients: string[];
  private _preparationTime: string;

  constructor() {
    this._title = '';
    this._ingredients = [];
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get ingredients(): string[] {
    return this._ingredients;
  }

  set ingredients(value: string[]) {
    this._ingredients = value;
  }

  get preparationTime(): string {
    return this._preparationTime;
  }

  set preparationTime(value: string) {
    this._preparationTime = value;
  }
}
