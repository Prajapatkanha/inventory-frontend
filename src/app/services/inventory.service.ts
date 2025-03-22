import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // ✅ Environment Import

export interface InventoryItem {
  _id?: string; 
  item: string;
  quantity: number;
  category: string; 
  price: number;
  supplier: string;
  brand: string;
  size: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // ✅ Use environment URL for production & local both
  private apiUrl = `${environment.apiUrl}/inventory`;

  // 🔹 Old Local URL (Just for reference, not used)
  // private apiUrl = 'http://localhost:5000/inventory';

  constructor(private http: HttpClient) {}

  /** ✅ Function to get headers with token */
  private getHeaders() {
    return { headers: new HttpHeaders({ Authorization: localStorage.getItem('token') || '' }) };
  }

  /** ✅ Fetch Inventory */
  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl, this.getHeaders());
  }

  /** ✅ Add Inventory Item */
  addInventoryItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(`${this.apiUrl}/add`, item, this.getHeaders());
  }

  /** ✅ Delete Inventory Item */
  deleteInventoryItem(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }

  /** ✅ Update Inventory Item */
  updateInventoryItem(id: string, updatedItem: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/update/${id}`, updatedItem, this.getHeaders());
  }
}
