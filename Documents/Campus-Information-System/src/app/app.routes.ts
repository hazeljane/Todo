import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Protect routes for authenticated users

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },      // Default redirect to login
  { path: 'login', component: LoginComponent },               // Public login page
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Protected dashboard
  { path: 'header', component: HeaderComponent },             // Header component route if needed standalone
  { path: '**', redirectTo: '/login', pathMatch: 'full' }     // Wildcard route redirects unknown paths to login
];
