export class Image {
  private _link: string;

  private constructor() {
  }

  static create(link: string): Image {
    const instance = new Image();
    instance._link = link;
    return instance;
  }

  get link(): string {
    return this._link;
  }
}
