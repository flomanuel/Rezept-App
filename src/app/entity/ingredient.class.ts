export class Ingredient {

  constructor(public label: string, public amount: number, public volumeUnit: string, public id: number,
              public customTitle: string = '', public additionalInfo: boolean = false, public done: boolean = false,
              public saved: boolean = false) {
  }
}
