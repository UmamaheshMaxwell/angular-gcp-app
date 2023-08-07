import { Injectable } from '@angular/core';
import { GoogleAuth } from 'google-auth-library';

@Injectable()
export class AuthService {
    url = 'https://node-gcp-service-3imv474m7a-uc.a.run.app/';
    targetAudience = 'https://angular-gcp-service-3imv474m7a-uc.a.run.app';

  constructor() {}

  async getGoogleSignedIdToken() {
    try {
      // Create a new GoogleAuth instance
      const auth = new GoogleAuth();
  
      // Obtain the default credentials
      const client = await auth.getIdTokenClient(this.targetAudience);
  
      // Get the ID token
      const res = await client.request({
        url: this.url,
        method: 'GET',
      });
  
      // Extract the ID token from the response
      const idToken = res.data;
      console.log(idToken)
      return idToken;
    } catch (err:any) {
      console.error('Error generating ID token:', err.message);
      return null;
    }
  }
}

