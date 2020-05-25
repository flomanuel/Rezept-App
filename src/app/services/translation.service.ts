import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  translate(word: string): string | null {
    const mapping = this.getMapping();

    if (mapping.category.hasOwnProperty(word)) {
      return mapping.category[word];
    }

    if (mapping.region.hasOwnProperty(word)) {
      return mapping.region[word];
    }

    if (mapping.ingredient.hasOwnProperty(word)) {
      return mapping.ingredient[word];
    }

    return null;
  }

  private getMapping(): { category: { [key: string]: string }, region: { [key: string]: string }, ingredient: { [key: string]: string } } {
    return {
      category: {
        soup: 'Suppe',
        fish: 'Fisch',
        meat: 'Fleisch',
        vegetarian: 'Vegetarisch',
        vegan: 'Vegan',
      },
      region: {
        asian: 'Asiatisch',
        turkish: 'Türkisch',
        german: 'Deutsch',
        american: 'Amerikanisch',
        italian: 'Italienisch',
      },
      ingredient: {
        beef: 'Rindfleisch',
        onion: 'Zwiebel',
        pickled_cucumber: 'Gewürzgurke',
        carrot: 'Möhre',
        mustard: 'Senf',
        paprika_powder_sweet: 'Paprikapulver, edelsüß',
        lemon_juice: 'Zitronensaft',
        salt: 'Salz',
        bay_leaf: 'Lorbeerblatt',
        water: 'Wasser',
        marjoram_dried: 'Majoran, getrocknet',
        celery_dried: 'Sellerie, getrocknet',
        margarine: 'Margarine',
        tomato_paste: 'Tomatenmark',
        corned_beef: 'Corned Beef',
        potato: 'Kartoffel',
        beetroot: 'Rote Bete',
        allspice_ground: 'Piment, gemahlen',
        cucumber_liquid: 'Gurkenflüssigkeit',
        egg: 'Ei',
        matjesfilet: 'Matjesfilet',
        pepper: 'Pfeffer',
        bismarck_herring: 'Bismarckhering',
        rollmops: 'Rollmops',
        olive_oil: 'Olivenöl',
        minced_meat_mixed: 'Hackfleisch, gemischt',
        garlic: 'Knoblauch',
        parsley: 'Petersilie',
        tomatoes: 'Tomaten',
        red_wine: 'Rotwein',
        milk: 'Milch',
        butter: 'Butter',
        flour: 'Mehl',
        nutmeg: 'Muskat',
        lasagna_plate_s: 'Lasagneplatte(n)',
        gouda_cheese: 'Gouda',
        butter_flakes: 'Butterflocken',
        mushrooms: 'Champignons',
        zucchini: 'Zucchini',
        oil: 'Öl',
        broth_grained: 'Brühe, gekörnt',
        oregano: 'Oregano',
        cream: 'Sahne',
      },
    };
  }

  getGermanMapping() {
    const mapping = this.getMapping();
    return {
      category: this.flipKeysAndValuesFromObject(mapping.category),
      region: this.flipKeysAndValuesFromObject(mapping.region),
      ingredient: this.flipKeysAndValuesFromObject(mapping.ingredient),
    };
  }

  private flipKeysAndValuesFromObject(object: object) {
    return Object.keys(object)
      .reduce((obj, key) => {
        obj[object[key]] = key;
        return obj;
      }, {});
  }
}
