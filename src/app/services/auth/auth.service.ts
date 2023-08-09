import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  audience = 'https://node-gcp-service-3imv474m7a-uc.a.run.app';

  constructor(private http: HttpClient) {}

  requestToken() {
    const requestUrl = "https://us-central1-gcp-training-386807.cloudfunctions.net/get-server-token"
    const tokenUrl = `${requestUrl}?url=${this.audience}`
    axios.get(tokenUrl).then(response => {
      localStorage.setItem("google_auth_token", response.data.token)
    })
  }
}

