import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quoteViewResolver } from '../quote-view.resolver';

describe('quoteViewResolverResolver', () => {
  const executeResolver: ResolveFn<void> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      quoteViewResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
