import { TestBed } from '@angular/core/testing';

import { FullScreenLoaderService } from './full-screen-loader.service';

describe('FullScreenLoaderService', () => {
  let service: FullScreenLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullScreenLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
