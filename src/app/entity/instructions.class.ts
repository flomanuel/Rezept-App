export class Instructions {
  private _instruction: string;

  private constructor() {
  }

  static create(instruction: string): Instructions {
    const instance = new Instructions();
    instance._instruction = instruction;
    return instance;
  }

  get instruction(): string {
    return this._instruction;
  }
}
