export class Ingredient {

  constructor(public amount: number, public volumeUnit: string, public id: number,
              public customTitle: string = '', public additionalInfo: boolean = false, public done: boolean = false) {
  }
}
