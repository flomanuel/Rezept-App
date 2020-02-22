import { TestBed } from '@angular/core/testing';

import { TypesMappingService } from './types-mapping.service';

describe('TypesMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypesMappingService = TestBed.get(TypesMappingService);
    expect(service).toBeTruthy();
  });
});
