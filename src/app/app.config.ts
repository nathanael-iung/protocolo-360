import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { errorHandlerInterceptor } from "@core/interceptors/error-handler/error-handler.interceptor";
import { loadingInterceptor } from "@core/interceptors/loading/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        errorHandlerInterceptor,
        loadingInterceptor
      ])
    )
  ]
};
