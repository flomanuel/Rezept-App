import {VolumeUnit} from '../types';

export class Ingredient {
  private _label: string;
  private readonly _additionalInfo: number;
  private _amount: number;
  private readonly _volumeUnit: VolumeUnit;
  private _missing: boolean;
  private _done: boolean;

  constructor(label?: string, amount?: number, volumeUnit?: VolumeUnit, additionalInfo: number = 0) {
    this._additionalInfo = additionalInfo;
    this._label = label;
    this._amount = amount;
    this._volumeUnit = volumeUnit;
    this._missing = false;
    this._done = false;
  }

  get done(): boolean {
    return this._done;
  }

  set done(done: boolean) {
    this._done = done;
  }

  get volumeUnit() {
    return this._volumeUnit;
  }

  get label(): string {
    return this._label;
  }

  set label(label: string) {
    this._label = label;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get missing(): boolean {
    return this._missing;
  }

  set missing(missing: boolean) {
    this._missing = missing;
  }

  get additionalInfo(): number {
    return this._additionalInfo;
  }
}
