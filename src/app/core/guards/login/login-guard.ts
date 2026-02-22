import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { TokenMetadataService } from "@core/services/token-metadata/token-metadata-service";

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenMetadataService = inject(TokenMetadataService);
  if (tokenMetadataService.getIsAuthenticated()) {
    return router.createUrlTree(['/dashboard']);
  }
  return true;
};
