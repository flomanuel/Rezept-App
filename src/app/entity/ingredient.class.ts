export class Ingredient {
  private readonly _label: string;
  private readonly _amount: number;
  private readonly _suffix: string;
  private _missing: boolean;

  constructor(label: string, amount: number, suffix: string) {
    this._label = label;
    this._amount = amount;
    this._suffix = suffix;
    this._missing = false;
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

  get missing(): boolean {
    return this._missing;
  }

  set missing(missing: boolean) {
    this._missing = missing;
  }
}
