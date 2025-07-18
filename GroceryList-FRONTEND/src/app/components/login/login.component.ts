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
  isSuccess = false;
  isRegisterMode = false;
  @Output() loggedIn = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.errorMessage = '';
    if (this.isRegisterMode) {
      this.authService.register(this.username, this.password).subscribe({
        next: (res) => {
          if (!res.success) {
            this.errorMessage = res.message ?? 'Registration failed';
            this.isSuccess = false;
          } else {
            // Switch to login mode after success
            this.isRegisterMode = false;
            this.errorMessage = 'Registration successful. Please log in.';
            this.isSuccess = true;
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed';
          this.isSuccess = false;
        }
      });
    } else {
      this.authService.login(this.username, this.password).subscribe({
        next: (res) => {
          if (!res.success) {
            this.errorMessage = res.message ?? 'Login failed';
            this.isSuccess = false;
          } else {
            this.loggedIn.emit();
          }
        },
        error: () => {
          this.errorMessage = 'Invalid credentials';
          this.isSuccess = false;
        }
      });
    }
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.isSuccess = false;
  }
} 