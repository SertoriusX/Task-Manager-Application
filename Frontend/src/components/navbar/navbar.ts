import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/AuthService/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  constructor(private authSer: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return !!this.authSer.getToken();
  }

  logout() {
    this.authSer.logout();
    this.router.navigate(['/login']);
  }
}