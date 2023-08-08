import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { catchError, switchMap, finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.getTokenAndSetHeaders(request, next);
  }

  private getTokenAndSetHeaders(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getIdentityToken().pipe(
      switchMap((token: string) => {
        console.log(`Identity token fetched: ${token}`);
        const authRequest = this.cloneRequestWithAuthorizationHeader(request, token);
        return this.handleRequestWithLogging(authRequest, next);
      }),
      catchError(error => {
        console.error('Error fetching identity token:', error);
        return next.handle(request); // Continue with the original request
      })
    );
  }

  private cloneRequestWithAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleRequestWithLogging(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Sending request with authorization header:', request);
    const startTime = Date.now();
    return next.handle(request).pipe(
      finalize(() => {
        const duration = Date.now() - startTime;
        console.log(`Response received in ${duration}ms`);
      })
    );
  }
}






