import { TestBed } from '@angular/core/testing';

import { FoodFacadeService } from './food-facade.service';

describe('FoodFacadeService', () => {
  let service: FoodFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
