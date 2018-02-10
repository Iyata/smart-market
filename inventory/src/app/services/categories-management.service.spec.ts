import { TestBed, inject } from '@angular/core/testing';

import { CategoriesManagementService } from './categories-management.service';

describe('CategoriesManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesManagementService]
    });
  });

  it('should be created', inject([CategoriesManagementService], (service: CategoriesManagementService) => {
    expect(service).toBeTruthy();
  }));
});
