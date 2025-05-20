import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notifications',
  imports: [FormsModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  newNotification = { title: '', message: '' };
  errorMessage: string = '';  // Add a property for error messages

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      data => this.notifications = data,
      error => {
        console.error('Error fetching notifications', error);
        this.errorMessage = 'Failed to load notifications. Please try again later.';  // Set error message
      }
    );
  }

  addNotification(): void {
    if (!this.newNotification.title || !this.newNotification.message) return;

    this.notificationService.addNotification(this.newNotification).subscribe(
      response => {
        this.notifications.push(response.notification);
        this.newNotification = { title: '', message: '' };
        this.errorMessage = '';  // Clear error message if successful
      },
      error => {
        console.error('Error adding notification', error);
        this.errorMessage = 'Failed to add notification. Please try again later.';  // Set error message
      }
    );
  }

  deleteNotification(id: number): void {
    this.notificationService.deleteNotification(id).subscribe(
      () => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.errorMessage = '';  // Clear error message if successful
      },
      error => {
        console.error('Error deleting notification', error);
        this.errorMessage = 'Failed to delete notification. Please try again later.';  // Set error message
      }
    );
  }
}
