import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any = null;  // ✅ Fix: `user` property add की गई

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData(); // ✅ Fix: User Data Load करने के लिए function call
  }

  loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout() {  // ✅ Fix: `logout` function add किया गया
    if (confirm("Are you sure you want to log out?")) {
      this.authService.logout();
      alert("✅ You have been logged out!");
      this.router.navigate(['/login']);
    }
  }
}
