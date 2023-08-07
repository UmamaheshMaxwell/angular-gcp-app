import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://node-gcp-service-3imv474m7a-uc.a.run.app';

  constructor(private http: HttpClient) { }

  health(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }
  
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }


}
