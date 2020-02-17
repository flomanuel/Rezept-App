export class Id {
  private _id: number;

  static fromNumber(id: number): Id {
    const instance = new Id();
    instance._id = id;
    return instance;
  }

  static generate(): number {
    return Math.floor(Math.random() * 9000);
  }

  get id(): number {
    return this._id;
  }
}
