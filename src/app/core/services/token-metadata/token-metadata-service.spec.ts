import { TestBed } from '@angular/core/testing';

import { TokenMetadataService } from './token-metadata-service';

describe('TokenMetadataService', () => {
  let service: TokenMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
