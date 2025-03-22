import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { name: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  /** ✅ Fetch All Categories */
  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (error) => console.error("❌ Error fetching categories:", error)
    });
  }

  /** ✅ Add New Category */
  addCategory() {
    if (!this.newCategory.name) {
      alert("⚠ Please enter category name.");
      return;
    }

    this.categoryService.addCategory(this.newCategory).subscribe({
      next: () => {
        alert("✅ Category added successfully!");
        this.fetchCategories();
        this.newCategory = { name: '' };
      },
      error: (error) => console.error("❌ Error adding category:", error)
    });
  }

  /** ✅ Delete Category */
  deleteCategory(id: string) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          alert("✅ Category deleted successfully!");
          this.fetchCategories();
        },
        error: (error) => console.error("❌ Error deleting category:", error)
      });
    }
  }
}
