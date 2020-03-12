export class Ingredient {

  constructor(public label: string, public amount: number, public volumeUnit: string, public id: number,
              public additionalInfo: boolean = false, public customTitle: string = '', public done?: boolean) {
  }
}
