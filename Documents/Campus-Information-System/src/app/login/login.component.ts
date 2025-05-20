import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

// ✅ Add these two imports:
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Required for ngIf and ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      this.authService.login(this.email, this.password).subscribe({
        next: (res: any) => {
          console.log('Login success:', res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = err.error.message || 'Login failed! Please check your credentials.';
          this.isLoading = false;
        }
      });
    } else {
      alert('Please fill in both email and password.');
    }
  }
}
