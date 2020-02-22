export class Ingredient {

  constructor(public label: string, public amount: number, public volumeUnit: string,
              private additionalInfo: number = 0, private customTitle: string = '', public done?: boolean) {
  }
}
