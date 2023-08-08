import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
    backendUrl = 'https://node-gcp-service-3imv474m7a-uc.a.run.app';
    audience = 'https://angular-gcp-service-3imv474m7a-uc.a.run.app';

  constructor(private http: HttpClient) {}

  getIdentityToken(): Observable<any> {
    const headers = new HttpHeaders({'Metadata-Flavor': 'Google'});
    const url = `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${this.audience}`;
    return this.http.get(url, { headers });
  }
}

