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
  0: 'beef',
  1: 'onion',
  2: 'pickled_cucumber',
  3: 'carrot',
  4: 'mustard',
  5: 'paprika_powder_sweet',
  6: 'lemon_juice',
  7: 'salt',
  8: 'bay_leaf',
  9: 'water',
  10: 'marjoram_dried',
  11: 'celery_dried',
  12: 'margarine',
  13: 'tomato_paste',
  14: 'corned_beef',
  15: 'potato',
  16: 'beetroot',
  17: 'allspice_ground',
  18: 'cucumber_liquid',
  19: 'egg',
  20: 'matjesfilet',
  21: 'pepper',
  22: 'bismarck_herring',
  23: 'rollmops',
  24: 'olive_oil',
  25: 'minced_meat_mixed',
  26: 'garlic',
  27: 'parsley',
  28: 'tomatoes',
  29: 'red_wine',
  30: 'milk',
  31: 'butter',
  32: 'flour',
  33: 'nutmeg',
  34: 'lasagna_plate_s',
  35: 'gouda_cheese',
  36: 'butter_flakes',
  37: 'mushrooms',
  38: 'zucchini',
  39: 'oil',
  40: 'broth_grained',
  41: 'oregano',
  42: 'cream',
};
