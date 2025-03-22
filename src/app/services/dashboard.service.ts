import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5000/api/dashboard'; // ✅ API URL

  constructor(private http: HttpClient) {}

  /** ✅ Get Dashboard Data */
  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
