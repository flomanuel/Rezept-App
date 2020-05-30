import { TestBed } from '@angular/core/testing';

import { UserRecipeService } from './user-recipe.service';

describe('UserRecipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRecipeService = TestBed.get(UserRecipeService);
    expect(service).toBeTruthy();
  });
});
