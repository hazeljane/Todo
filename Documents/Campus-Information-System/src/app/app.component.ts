import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet , RouterModule} from '@angular/router'; // Ensure we use router outlet
import { UserService } from './user.service'; // Assuming you are using UserService to get data
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], // Import router outlet to load routed components
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch users data when the component initializes
    this.userService.getUsers().subscribe({
      next: (data: any[]) => this.users = data,
      error: (err: any) => console.error('Error:', err)
    });
  }
}
