import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Supplier {
  _id?: string;
  name: string;
  contact: string;
  email: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:5000/api/suppliers';

  constructor(private http: HttpClient) {}

  /** ✅ Get All Suppliers */
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /** ✅ Add Supplier */
  addSupplier(supplier: Supplier): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, supplier).pipe(
      catchError(this.handleError)
    );
  }

  /** ✅ Delete Supplier */
  deleteSupplier(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** ❌ Handle Errors */
  private handleError(error: HttpErrorResponse) {
    console.error("❌ API Error:", error);
    return throwError(() => new Error(error.error?.message || "Something went wrong"));
  }
}
