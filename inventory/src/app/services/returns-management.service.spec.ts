import { TestBed, inject } from '@angular/core/testing';

import { ReturnsManagementService } from './returns-management.service';

describe('ReturnsManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnsManagementService]
    });
  });

  it('should be created', inject([ReturnsManagementService], (service: ReturnsManagementService) => {
    expect(service).toBeTruthy();
  }));
});
