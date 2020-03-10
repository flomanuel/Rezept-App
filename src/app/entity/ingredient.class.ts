export class Ingredient {

  constructor(public label: string, public amount: number, public volumeUnit: string, public id: number,
              public additionalInfo: number = 0, public customTitle: string = '', public done: boolean = false) {
  }
}
