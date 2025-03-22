import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from '../services/inventory.service';
import { CategoryService, Category } from '../services/category.service';
import { SupplierService, Supplier } from '../services/supplier.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  categories: Category[] = []; // ✅ Category List for Dropdown
  suppliers: Supplier[] = [];  // ✅ Supplier List for Dropdown
  newItem: Omit<InventoryItem, '_id'> = this.getDefaultItem();
  editingItem: string | null = null;
  editedItem: Partial<InventoryItem> = this.getDefaultItem();

  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchInventory();
    this.fetchCategories();
    this.fetchSuppliers();
  }

  /** ✅ Default Empty Item */
  getDefaultItem(): Omit<InventoryItem, '_id'> {
    return { 
      item: '', 
      quantity: 1, 
      category: '', 
      price: 0, 
      supplier: '', 
      brand: '', 
      size: '', 
      color: '' 
    };
  }

  /** ✅ Fetch Inventory List */
  fetchInventory() {
    this.inventoryService.getInventory().subscribe({
      next: (data: InventoryItem[]) => this.inventory = data,
      error: (error) => console.error("❌ Error fetching inventory:", error)
    });
  }

  /** ✅ Fetch Categories */
  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => this.categories = data,
      error: (error) => console.error("❌ Error fetching categories:", error)
    });
  }

  /** ✅ Fetch Suppliers */
  fetchSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data: Supplier[]) => this.suppliers = data,
      error: (error) => console.error("❌ Error fetching suppliers:", error)
    });
  }

  /** ✅ Add New Item */
  addItem() {
    if (!this.newItem.item.trim() || this.newItem.quantity <= 0 || !this.newItem.category) {
      alert("⚠ Please enter all required fields.");
      return;
    }

    this.inventoryService.addInventoryItem(this.newItem).subscribe({
      next: () => {
        alert("✅ Item added successfully!");
        this.fetchInventory();
        this.newItem = this.getDefaultItem();
      },
      error: (error) => {
        console.error("❌ Error adding item:", error);
        alert("❌ Failed to add item. Please try again.");
      }
    });
  }

  /** ✅ Edit Item */
  editItem(item: InventoryItem) {
    this.editingItem = item._id!;
    this.editedItem = { ...item };
  }

  /** ✅ Save Edited Item */
  saveEdit() {
    if (!this.editingItem) {
      alert("❌ No item selected for editing.");
      return;
    }

    this.inventoryService.updateInventoryItem(this.editingItem, this.editedItem as InventoryItem).subscribe({
      next: () => {
        alert("✅ Item updated successfully!");
        this.fetchInventory();
        this.cancelEdit();
      },
      error: (error) => {
        console.error("❌ Error updating item:", error);
        alert("❌ Failed to update item. Please try again.");
      }
    });
  }

  /** ✅ Delete Item */
  deleteItem(itemId: string | undefined) {
    if (!itemId) {
      alert("❌ Error: Item ID is missing!");
      return;
    }

    if (confirm("Are you sure you want to delete this item?")) {
      this.inventoryService.deleteInventoryItem(itemId).subscribe({
        next: () => {
          alert("✅ Item deleted successfully!");
          this.fetchInventory();
        },
        error: (error) => {
          console.error("❌ Error deleting item:", error);
          alert("❌ Failed to delete item. Please try again.");
        }
      });
    }
  }

  /** ✅ Cancel Edit */
  cancelEdit() {
    this.editingItem = null;
    this.editedItem = this.getDefaultItem();
  }
}
