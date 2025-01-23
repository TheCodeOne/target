import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FEATURE_QUOTE_ROUTES } from '@target/quote-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(FEATURE_QUOTE_ROUTES),
    provideHttpClient(),
  ],
};
