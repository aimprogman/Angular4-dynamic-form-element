import { TestBed, inject } from '@angular/core/testing';

import { AimService } from './aim.service';

describe('AimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AimService]
    });
  });

  it('should be created', inject([AimService], (service: AimService) => {
    expect(service).toBeTruthy();
  }));
});
