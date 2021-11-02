import { TestBed } from '@angular/core/testing';

import { FoodCategoriesFacadeService } from './food-categories-facade.service';

describe('FoodCategoriesFacadeService', () => {
  let service: FoodCategoriesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCategoriesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
