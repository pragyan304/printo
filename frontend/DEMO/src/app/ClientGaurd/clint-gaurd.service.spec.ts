import { TestBed } from '@angular/core/testing';

import { ClintGaurdService } from './clint-gaurd.service';

describe('ClintGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClintGaurdService = TestBed.get(ClintGaurdService);
    expect(service).toBeTruthy();
  });
});
