import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';  // ✅ Import NgIf
import { AuthService } from './services/auth.service';  // ✅ Import AuthService
import { SidebarComponent } from './sidebar/sidebar.component';  // ✅ Import Sidebar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf, SidebarComponent],  // ✅ Add NgIf here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  constructor(public authService: AuthService, private router: Router) {}  

  // ✅ Sidebar Hide करने का Logic (Login और Signup पेज पर नहीं दिखेगा)
  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup';
  }
}
