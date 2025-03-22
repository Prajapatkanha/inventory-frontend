import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // ✅ Ensure RouterModule is imported

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // ✅ Add RouterModule
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.user).subscribe({
      next: (res: any) => {
        alert("Signup Successful! Please login.");
        this.router.navigate(['/login']);  // ✅ Navigate to Login instead of Inventory
      },
      error: (error) => {
        alert("Signup Failed! Please check your details.");
        console.error("Signup error:", error);
      }
    });
  }
}
