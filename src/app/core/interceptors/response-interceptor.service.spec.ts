import { TestBed } from '@angular/core/testing';

import { ResponseInterceptor } from './response-interceptor';

describe('ResponseInterceptorService', () => {
  let service: ResponseInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
