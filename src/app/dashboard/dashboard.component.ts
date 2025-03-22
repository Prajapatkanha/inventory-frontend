import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ CommonModule Import किया
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule] // ✅ इसे add किया
})
export class DashboardComponent implements OnInit {
  totalInventory: number = 0;
  totalOrders: number = 0;
  totalSuppliers: number = 0;
  lowStockItems: number = 0;
  totalCategories: number = 0;
  totalRevenue: number = 0;
  lowStockList: any[] = []; // ✅ Low Stock Items List

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.fetchDashboardData();
  }

  /** ✅ Fetch Dashboard Data */
  fetchDashboardData() {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        console.log("✅ Dashboard API Response:", data); // ✅ Debugging
  
        this.totalInventory = data.totalInventory;
        this.lowStockItems = data.lowStockItems;
        this.totalCategories = data.totalCategories;
        this.totalOrders = data.totalOrders;
        this.totalSuppliers = data.totalSuppliers;
        this.totalRevenue = data.totalRevenue;
        this.lowStockList = data.lowStockList || []; // ✅ Low Stock List Store कर रहे हैं
  
        console.log("✅ Low Stock Items:", this.lowStockList); // ✅ Low Stock Items को Check करें
      },
      error: (error) => {
        console.error("❌ Error fetching dashboard data:", error);
      }
    });
  }
}  