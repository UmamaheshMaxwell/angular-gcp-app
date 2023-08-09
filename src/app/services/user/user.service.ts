import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';
import { GoogleAuthService } from '../auth/auth.service';
import axios from "axios"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://node-gcp-service-3imv474m7a-uc.a.run.app';

  constructor(private http: HttpClient) { }

  health(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }
  
  // getUsers(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/users`);
  // }

  async getUsers() {
    const token = localStorage.getItem('google_auth_token');
    const headers = {"Authorization": `Bearer ${token}`}
    console.log(headers)
    return await axios.get(`${this.apiUrl}/users`, {headers});
  }
}
