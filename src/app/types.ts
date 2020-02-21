export interface FireBaseQueryResult {
  categories: string[]; // array like ["1", "6"]
  preparationTime: string; // string like "80" (minutes)
  images: string[];
  ingredients: {
    [key: string]: {
      [additionalInfo: string]: number, // string like "1"
      // @ts-ignore
      [amount: string]: string, // string like "1 Tasse"
    }
  };
  instructions: string; // really long string
  region: string[]; // array like ["7", "13"]
  title: string;
  video: string; // link to video
}

export enum Categories {
  SOUP = 'soup',
  FISH = 'fish',
  MEAT = 'meat',
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
}

export enum Regions {
  ASIAN = 'asian',
  TURKISH = 'turkish',
  GERMAN = 'german',
  AMERICAN = 'american',
  ITALIAN = 'italian'
}

export enum VolumeUnit {
  STUECK = 'Stk',

  GRAMM = 'g',
  KILOGRAMM = 'kg',

  MILLILITER = 'ml',
  LITER = 'l',

  TEELOEFFEL = 'TL',
  ESSLOEFFEL = 'EL'
}

export const categories = {
  1: 'soup',
  2: 'vegetarian',
  3: 'vegan',
  4: 'meat',
  5: 'fish',
};

export const regions = {
  1: 'turkish',
  2: 'german',
  3: 'italian',
  4: 'american',
  5: 'asian',
};

export const ingredients = {
  1: 'Linsen',
};
