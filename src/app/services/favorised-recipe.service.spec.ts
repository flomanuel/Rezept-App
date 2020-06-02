import { TestBed } from '@angular/core/testing';

import { FavoredRecipeService } from './favored-recipe.service';

describe('FavorisedRecipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoredRecipeService = TestBed.get(FavoredRecipeService);
    expect(service).toBeTruthy();
  });
});
