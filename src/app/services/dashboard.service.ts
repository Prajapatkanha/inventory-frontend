import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // ✅ Environment Import

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // ✅ Use environment URL for production & local both
  private apiUrl = `${environment.apiUrl}/dashboard`;

  // 🔹 Old Local URL (Just for reference, not used)
  // private apiUrl = 'http://localhost:5000/dashboard';

  constructor(private http: HttpClient) {}

  /** ✅ Get Dashboard Data */
  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
