import { Component, OnInit } from '@angular/core';
import { SupplierService, Supplier } from '../services/supplier.service';
import { FormsModule } from '@angular/forms'; // ✅ Fix for [(ngModel)]
import { CommonModule } from '@angular/common'; // ✅ Fix for *ngFor

@Component({
  selector: 'app-suppliers',
  standalone: true,
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  imports: [FormsModule, CommonModule] // ✅ Fix
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  newSupplier: Supplier = { name: '', contact: '', email: '', address: '' };

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.fetchSuppliers();
  }

  /** ✅ Fetch All Suppliers */
  fetchSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => this.suppliers = data,
      error: (error) => console.error("❌ Error fetching suppliers:", error)
    });
  }

  /** ✅ Add New Supplier */
  addSupplier() {
    if (!this.newSupplier.name || !this.newSupplier.contact) {
      alert("⚠ Please enter all required fields.");
      return;
    }

    this.supplierService.addSupplier(this.newSupplier).subscribe({
      next: () => {
        alert("✅ Supplier added successfully!");
        this.fetchSuppliers();
        this.newSupplier = { name: '', contact: '', email: '', address: '' };
      },
      error: (error) => console.error("❌ Error adding supplier:", error)
    });
  }

  /** ✅ Delete Supplier */
  deleteSupplier(id: string) {
    if (confirm("Are you sure you want to delete this supplier?")) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          alert("✅ Supplier deleted successfully!");
          this.fetchSuppliers();
        },
        error: (error) => console.error("❌ Error deleting supplier:", error)
      });
    }
  }
}
