import { Component, EventEmitter, Output, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  feedbackMessage = '';
  isSuccess = false; // for registration success visual
  isRegisterMode = false;
  @Output() loggedIn = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  private readonly destroyRef = inject(DestroyRef);

  onSubmit(): void {
    this.errorMessage = '';
    if (this.isRegisterMode) {
      this.authService.register(this.username, this.password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          // Registration successful
          this.isRegisterMode = false;
          this.feedbackMessage = 'Registration successful. Please log in.';
          this.isSuccess = true;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed';
          this.isSuccess = false;
        }
      });
    } else {
      this.authService.login(this.username, this.password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          // Notify parent if needed
          this.loggedIn.emit();
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
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