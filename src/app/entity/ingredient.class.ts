export class Ingredient {
  private readonly _label: string;
  private readonly _amount: number;
  private readonly _suffix: string;

  constructor(label: string, amount: number, suffix: string) {
    this._label = label;
    this._amount = amount;
    this._suffix = suffix;
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
