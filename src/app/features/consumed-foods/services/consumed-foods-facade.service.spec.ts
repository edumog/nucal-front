import { TestBed } from '@angular/core/testing';

import { ConsumedFoodsFacadeService } from './consumed-foods-facade.service';

describe('ConsumedFoodsFacadeService', () => {
  let service: ConsumedFoodsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumedFoodsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
