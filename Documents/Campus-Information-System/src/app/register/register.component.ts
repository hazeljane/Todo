import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }
    this.isLoading = true;
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! You can login now.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Registration failed';
        this.successMessage = "";
      }
    });
  }
}
