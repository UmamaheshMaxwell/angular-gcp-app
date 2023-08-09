import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GoogleAuthService } from './services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token:any = localStorage.getItem("google_auth_token")
  constructor(private authService: GoogleAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const token:any = localStorage.getItem("google_auth_token")
    console.log(`Here is the ${this.token}`)
    const authRequest = this.addAuthenticationToken(request, this.token);
    console.log(authRequest)
    return next.handle(authRequest);
  }

  addAuthenticationToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
