import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // ✅ Ensure RouterModule is imported

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // ✅ Add RouterModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  user = { email: '', password: '' };
  private subscription: Subscription | null = null;  // ✅ Avoid `!`

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.subscription = this.authService.login(this.user).subscribe({
      next: (res: any) => {
        console.log("✅ Login API Response:", res); // Debugging ke liye

        if (res.token && res.user) {
          alert("Login Successful! Redirecting to Dashboard...");
          
          // ✅ Token Store Karna
          localStorage.setItem('token', res.token);  
          
          // ✅ User Data Store Karna
          localStorage.setItem('user', JSON.stringify(res.user));  

          this.router.navigate(['/dashboard']);
        } else {
          alert("Invalid Credentials");
        }
      },
      error: (error) => {
        console.error("❌ Login error:", error);
        alert("Login Failed! Please check your credentials.");
      }
    });
}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();  // ✅ Prevent memory leaks
    }
  }
}
