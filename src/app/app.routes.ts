import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
   { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
   { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
   { path: 'inventory', loadComponent: () => import('./inventory/inventory.component').then(m => m.InventoryComponent), canActivate: [AuthGuard] },
   { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
   { path: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent), canActivate: [AuthGuard] },
   { path: 'suppliers', loadComponent: () => import('./suppliers/suppliers.component').then(m => m.SuppliersComponent), canActivate: [AuthGuard] },
   { path: 'categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent), canActivate: [AuthGuard] }, // ✅ Category Route Added
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default page Dashboard rakha hai
];
