import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { TokenMetadataService } from "@core/services/token-metadata/token-metadata-service";

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const tokenMetadataService = inject(TokenMetadataService);

  if (tokenMetadataService.getExp() > Date.now()) {
    return true;
  }

  // 2. If not, try to recover the session (e.g., check sessionStorage or a 'hint' in localStorage)
  // Or simply redirect to login
  return router.createUrlTree(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
};
