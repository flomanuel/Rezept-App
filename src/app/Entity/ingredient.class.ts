export class Ingredient {
  private readonly _label: string;
  private readonly _amount: number;
  private readonly _suffix: string;

  private constructor(label: string, amount: number, suffix: string) {
    this._label = label;
    this._amount = amount;
    this._suffix = suffix;
  }

  static create(label: string, amount: number, suffix: string): Ingredient {
    return new Ingredient(label, amount, suffix);
  }

  get label(): string {
    return this._label;
  }

  get amount(): number {
    return this._amount;
  }

  get suffix(): string {
    return this._suffix;
  }
}
