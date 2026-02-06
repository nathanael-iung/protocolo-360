import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { ToastService } from "@shared/components/toast/toast-service";

import { catchError, throwError } from "rxjs";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastService)

  const showMessages = (errorMessages: string | string[]) => {
    if (!Array.isArray(errorMessages)) {
      toast.danger(errorMessages)
      return
    }
    errorMessages.forEach(message => {
      toast.danger(message)
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400 && error.error?.message) {
        showMessages(error.error.message)
      } else if (error.status === 401 && error.error?.message) {
        showMessages(error.error.message)
      } else {
        toast.danger('Something went wrong.', `Error ${error.status}`)
      }
      return throwError(() => error);
    })
  );
};
