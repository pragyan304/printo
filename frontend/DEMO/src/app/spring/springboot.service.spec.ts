import { TestBed } from '@angular/core/testing';

import { SpringbootService } from './springboot.service';

describe('SpringbootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpringbootService = TestBed.get(SpringbootService);
    expect(service).toBeTruthy();
  });
});
