import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AuthGuard } from './auth.guard';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
   { path: 'signup', component: SignupComponent },  // ✅ Ensure this exists
   { path: 'login', component: LoginComponent },  // ✅ Ensure this exists
   { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
   { path: 'orders', component: OrdersComponent },
   { path: '', redirectTo: 'login', pathMatch: 'full' }  // ✅ Correct redirect
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
