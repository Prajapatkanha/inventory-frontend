import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // ✅ Environment Import

export interface Category {
  _id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // ✅ Use environment URL for production & local both
  private apiUrl = `${environment.apiUrl}/category`;

  // 🔹 Old Local URL (Just for reference, not used)
  // private apiUrl = 'http://localhost:5000/category';
  constructor(private http: HttpClient) {}

  /** ✅ Get All Categories */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  /** ✅ Add Category */
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/add`, category);
  }

  /** ✅ Delete Category */
  deleteCategory(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${id}`);
  }
}
