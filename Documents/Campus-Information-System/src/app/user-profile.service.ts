// user-profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:5000/api/students/profile';

  constructor(private http: HttpClient) {}

  // Method to get the profile with token
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');  // Retrieve the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
