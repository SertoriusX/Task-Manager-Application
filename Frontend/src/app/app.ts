import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../components/navbar/navbar';
import { AuthService } from '../service/AuthService/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TaskManager');
  private authService = inject(AuthService);
  
  get isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }
}
