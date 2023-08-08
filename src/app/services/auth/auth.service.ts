import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

// @Injectable()
// export class AuthService {
//     backendUrl = 'https://node-gcp-service-3imv474m7a-uc.a.run.app';
//     audience = 'https://angular-gcp-service-3imv474m7a-uc.a.run.app';

//   constructor(private http: HttpClient) {}

//   getIdentityToken(): Observable<string> {
//     const headers = new HttpHeaders({ 'Metadata-Flavor': 'Google' });
//     const url = `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${this.audience}`;

//     return this.http.get(url, { headers, responseType: 'text' }).pipe(
//       catchError(error => {
//         console.error('Error fetching identity token:', error);
//         return throwError('Failed to fetch identity token');
//       })
//     );
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  audience = 'https://angular-gcp-service-3imv474m7a-uc.a.run.app';
  constructor(private http: HttpClient) {}

  async requestToken(): Promise<any> {
    const headers = new HttpHeaders({
      'Metadata-Flavor': 'Google'
    });

    const requestUrl = `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${this.audience}`;

    try {
      const token = await this.http.get(requestUrl, { headers, responseType: 'text' }).toPromise();
      console.log('ID Token:', token);
      return token;
    } catch (error) {
      console.error('Error requesting ID token:', error);
      throw error;
    }
  }
}

