export class PreparationTime {
  private _preparationTime: number;

  private constructor() {
  }

  static create(preparationTime: number): PreparationTime {
    const instance = new PreparationTime();
    instance._preparationTime = preparationTime;
    return instance;
  }

  get preparationTime(): number {
    return this._preparationTime;
  }
}
