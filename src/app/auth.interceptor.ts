import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Call getIdentityToken from AuthService
    return this.authService.getIdentityToken().pipe(
      switchMap((token: string) => {
        // Add the token to the "Authorization" header of the request
        console.log(`token : ${token}`)
        const authRequest = request.clone({
          setHeaders: { 
            Authorization: `Bearer ${token}`
          }
        });
        // Pass the modified request to the next interceptor or to the HTTP handler
        return next.handle(authRequest);
      })
    );
  }
}