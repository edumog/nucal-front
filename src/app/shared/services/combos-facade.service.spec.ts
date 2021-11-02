import { TestBed } from '@angular/core/testing';

import { CombosFacadeService } from './combos-facade.service';

describe('CombosFacadeService', () => {
  let service: CombosFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombosFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
