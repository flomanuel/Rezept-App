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

    return null;
  }

  private getMapping(): { category: { [key: string]: string }, region: { [key: string]: string } } {
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
    };
  }
}
