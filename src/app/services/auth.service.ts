import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  /** ✅ Signup API */
  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      catchError(error => this.handleError(error, "Signup failed! Please try again."))
    );
  }

  /** ✅ Login API */
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      catchError(error => this.handleError(error, "Login failed! Please check your credentials."))
    );
  }

  /** ✅ Store Token & User Data */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUser(user: any) {
    if (user && user.name) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.warn("⚠ No user data received from backend.");
    }
  }

  /** ✅ Get Token & User Data */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any | null {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("❌ Error parsing user data:", error);
      return null;
    }
  }

  /** ✅ Check if User is Logged In */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** ✅ Logout User */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert("✅ You have been logged out!");
    this.router.navigate(['/login']);
  }

  /** ✅ Handle API Errors */
  private handleError(error: any, message: string) {
    console.error(`❌ Error: ${message}`, error);
    alert(message);
    return throwError(() => error);
  }
}
