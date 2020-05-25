import { TestBed } from '@angular/core/testing';

import { JsonRequestService } from './json-request.service';

describe('JsonRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonRequestService = TestBed.get(JsonRequestService);
    expect(service).toBeTruthy();
  });
});
