import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class SidebarComponent implements OnInit {
  userName: string = 'Guest';

  constructor(public authService: AuthService) {} 

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.name;
    }
  }

  logout() {
    this.authService.logout();
  }
}
