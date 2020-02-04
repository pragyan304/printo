import { TestBed } from '@angular/core/testing';

import { ClientAuthenticationService } from './client-authentication.service';

describe('ClientAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientAuthenticationService = TestBed.get(ClientAuthenticationService);
    expect(service).toBeTruthy();
  });
});
