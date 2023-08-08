import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
    backendUrl = 'https://node-gcp-service-3imv474m7a-uc.a.run.app';
    audience = 'https://angular-gcp-service-3imv474m7a-uc.a.run.app';

  constructor(private http: HttpClient) {}

  async getIdentityToken(): Promise<any> {
      const headers = new HttpHeaders({ 'Metadata-Flavor': 'Google' });
      const url = `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${this.audience}`
      return await this.http.get(url, { headers }).toPromise();
  }
}

