import { TestBed } from '@angular/core/testing';

import { FlattenService } from './flatten.service';

describe('FlattenService', () => {
  let service: FlattenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlattenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
