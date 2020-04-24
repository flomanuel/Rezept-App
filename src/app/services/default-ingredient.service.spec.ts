import { TestBed } from '@angular/core/testing';

import { DefaultIngredientService } from './default-ingredient.service';

describe('DefaultIngredientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultIngredientService = TestBed.get(DefaultIngredientService);
    expect(service).toBeTruthy();
  });
});
