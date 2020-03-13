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

export enum VolumeUnit {
  STUECK = 'Stk',

  GRAMM = 'g',
  KILOGRAMM = 'kg',

  MILLILITER = 'ml',
  LITER = 'l',

  TEELOEFFEL = 'TL',
  ESSLOEFFEL = 'EL',

  TASSE = 'Tasse',
  TASSEN = 'Tassen',

  DOSE = 'Dose',
  BUND = 'Bund',
  ETWAS = 'etwas',
  NACHBEDARF = 'n.B.'
}

export enum PopupType {
  INFO = 'info',
  SUCCESS = 'success',
  DANGER = 'danger',
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
  0: 'Rindfleisch',
  1: 'Zwiebel',
  2: 'Gewürzgurke',
  3: 'Möhre',
  4: 'Senf',
  5: 'Paprikapulver, edelsüß',
  6: 'Zitronensaft',
  7: 'Salz',
  8: 'Lorbeerblatt',
  9: 'Wasser',
  10: 'Majoran, getrocknet',
  11: 'Sellerie, getrocknet',
  12: 'Margarine',
  13: 'Tomatenmark',
  14: 'Corned Beef',
  15: 'Kartoffel',
  16: 'Rote Bete',
  17: 'Piment, gemahlen',
  18: 'Gurkenflüssigkeit',
  19: 'Ei',
  20: 'Matjesfilet',
  21: 'Pfeffer',
  22: 'Bismarckhering',
  23: 'Rollmops',
  24: 'Olivenöl',
  25: 'Hackfleisch, gemischt',
  26: 'Knoblauch',
  27: 'Petersilie',
  28: 'Tomaten',
  29: 'Rotwein',
  30: 'Milch',
  31: 'Butter',
  32: 'Mehl',
  33: 'Muskat',
  34: 'Lasagneplatte(n)',
  35: 'Gouda',
  36: 'Butterflocken',
  37: 'Champignons',
  38: 'Zucchini',
  39: 'Öl',
  40: 'Brühe, gekörnt',
  41: 'Oregano',
  42: 'Sahne'
};
