export class Video {
  private _link: string;

  private constructor() {
  }

  static create(link: string): Video {
    const instance = new Video();
    instance._link = link;
    return instance;
  }

  get link(): string {
    return this._link;
  }
}
