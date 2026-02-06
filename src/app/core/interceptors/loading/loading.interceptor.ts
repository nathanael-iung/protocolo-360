import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { SHOW_LOADER, SKIP_LOADER } from "@shared/constants/http-context-token";
import { LoadingService } from "@shared/services/loading/loading-service";
import { finalize } from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  if(req.context.get(SKIP_LOADER)){
    return next(req);
  }
  if (req.method === 'POST' || req.context.get(SHOW_LOADER)) {
    loadingService.show();
    return next(req).pipe(
      finalize(() => loadingService.hide())
    );
  }
  return next(req);
};
