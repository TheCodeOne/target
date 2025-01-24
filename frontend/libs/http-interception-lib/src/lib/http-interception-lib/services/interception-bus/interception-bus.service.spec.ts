import { TestBed } from '@angular/core/testing';

import { InterceptionBusService } from './interception-bus.service';

describe('InterceptionBusService', () => {
  let service: InterceptionBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptionBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
