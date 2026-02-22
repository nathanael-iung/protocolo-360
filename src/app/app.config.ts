import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { errorHandlerInterceptor } from "@core/interceptors/error-handler/error-handler.interceptor";
import { loadingInterceptor } from "@core/interceptors/loading/loading.interceptor";
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { authInterceptor } from "@core/interceptors/auth/auth-interceptor";
import { AuthService } from "@core/services/auth/auth-service";
import { catchError, of } from "rxjs";

export function initializeApp(authService: AuthService) {
  return () => {
    const hasSessionHint = authService.getsessionHint();
    if (!hasSessionHint) {
      return of(null);
    }
    return authService.refresh().pipe(
      catchError(() => {
        authService.clearSessionHint();
        return of(null);
      })
    );
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        errorHandlerInterceptor,
        loadingInterceptor,
        authInterceptor
      ])
    ),
    provideEnvironmentNgxMask(),
    {
      provide: 'APP_INITIALIZER',
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }
  ]
};
