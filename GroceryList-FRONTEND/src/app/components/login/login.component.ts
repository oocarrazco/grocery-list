import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  @Output() loggedIn = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (!res.success) {
          this.errorMessage = res.message ?? 'Login failed';
        } else {
          this.loggedIn.emit();
        }
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
} 