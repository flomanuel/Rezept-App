export class Ingredient {

  constructor(private label: string, private amount: number, private suffix: string,
              private additionalInfo: number = 0, private customTitle: string = '') {
  }
}
