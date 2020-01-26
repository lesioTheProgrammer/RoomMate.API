import { TestBed, inject } from '@angular/core/testing';

import { FlatAddressService } from './flat-address.service';

describe('FlatAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlatAddressService]
    });
  });

  it('should be created', inject([FlatAddressService], (service: FlatAddressService) => {
    expect(service).toBeTruthy();
  }));
});
