import { TestBed, inject } from '@angular/core/testing';

import { Core\AuthGuardService } from './core\auth-guard.service';

describe('Core\AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Core\AuthGuardService]
    });
  });

  it('should be created', inject([Core\AuthGuardService], (service: Core\AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
