import { TestBed } from '@angular/core/testing';

import { IngredientInfoService } from './ingredient-info.service';

describe('IngredientInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredientInfoService = TestBed.get(IngredientInfoService);
    expect(service).toBeTruthy();
  });
});
