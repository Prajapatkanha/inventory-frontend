import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // ✅ Environment Import

export interface Order {
  _id?: string;
  customerName: string;
  items: { itemId: string; itemName: string; quantity: number; price: number }[];
  totalAmount: number;
  status?: string;
  orderDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // ✅ Use environment URL for production & local both
  private apiUrl = `${environment.apiUrl}/orders`;

  // 🔹 Old Local URL (Just for reference, not used)
  // private apiUrl = 'http://localhost:5000/order';

  constructor(private http: HttpClient) {}

  // ✅ Function to get headers with token
  private getHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("❌ No token found in localStorage!");
      return { headers: new HttpHeaders() };
    }
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  /** ✅ Get All Orders */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, this.getHeaders());
  }

  /** ✅ Add Order */
  addOrder(order: Order): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, order, this.getHeaders());
  }

  /** ✅ Delete Order */
  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }

  /** ✅ Update Order Status (Mark as Completed) */
  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status/${orderId}`, { status }, this.getHeaders());
  }
}
