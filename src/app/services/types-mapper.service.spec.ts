import { TestBed } from '@angular/core/testing';

import { TypesMapperService } from './types-mapper.service';

describe('TypesMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypesMapperService = TestBed.get(TypesMapperService);
    expect(service).toBeTruthy();
  });
});
