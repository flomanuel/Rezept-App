export class Ingredient {

  constructor(public label: string, public amount: number, public volumeUnit: string, public id: number,
              private additionalInfo: number = 0, public customTitle: string = '', public done?: boolean) {
  }
}
