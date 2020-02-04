import { TestBed } from '@angular/core/testing';

import { MixGaurdService } from './mix-gaurd.service';

describe('MixGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MixGaurdService = TestBed.get(MixGaurdService);
    expect(service).toBeTruthy();
  });
});
