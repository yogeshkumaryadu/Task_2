import { TestBed } from '@angular/core/testing';

import { HttpLoadObserverService } from './http-load-observer.service';

describe('HttpLoadObserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpLoadObserverService = TestBed.get(HttpLoadObserverService);
    expect(service).toBeTruthy();
  });
});
