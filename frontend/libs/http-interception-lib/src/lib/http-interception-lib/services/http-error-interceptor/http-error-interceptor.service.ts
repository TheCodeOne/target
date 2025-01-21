import { HttpErrorResponse,HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { InterceptionBusService } from '../interception-bus/interception-bus.service';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  private readonly errorNotifier = inject(InterceptionBusService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'An unexpected error occurred.';

        this.errorNotifier.notifyError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
