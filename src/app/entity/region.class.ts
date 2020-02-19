export class Region {
  private _region: string;

  private constructor() {
  }

  static create(region: string) {
    const instance = new Region();
    instance._region = region;
    return instance;
  }

  get region(): string {
    return this._region;
  }
}
