import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { providePrimeNG } from 'primeng/config';
import StylePreset from './shared/style/style-preset';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { apiUrlInterceptor } from './shared/interceptors/api-url.interceptor';
import { reducers } from './shared/store/app.reducer';
import { metaReducers, rehydrateState } from './shared/store/metaReducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers, {
      metaReducers: metaReducers,
      initialState: rehydrateState(),
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    providePrimeNG({
      theme: {
        preset: StylePreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([apiUrlInterceptor])),
  ],
};
