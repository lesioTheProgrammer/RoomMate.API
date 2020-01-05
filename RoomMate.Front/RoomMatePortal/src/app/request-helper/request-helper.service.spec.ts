import { TestBed, inject } from '@angular/core/testing';

import { RequestHelperService } from './request-helper.service';

describe('RequestHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestHelperService]
    });
  });

  it('should be created', inject([RequestHelperService], (service: RequestHelperService) => {
    expect(service).toBeTruthy();
  }));
});
