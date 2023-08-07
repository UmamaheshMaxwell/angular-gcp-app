import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Use `from` to convert the Promise into an Observable
    return from(this.authService.getGoogleSignedIdToken()).pipe(
      switchMap((idToken: any) => {
        // Add the ID token to the "Authorization" header of the request
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${idToken}`
          }
        });
        // Pass the modified request to the next interceptor or to the HTTP handler
        return next.handle(authRequest);
      })
    );
  }
}