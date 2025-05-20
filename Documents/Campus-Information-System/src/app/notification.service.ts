import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Notification {
  id?: number;
  title: string;
  message: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/admin/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching notifications:', error);
        return throwError('Error fetching notifications, please try again later.');
      })
    );
  }

  addNotification(notification: Notification): Observable<any> {
    return this.http.post(this.apiUrl, notification).pipe(
      catchError((error) => {
        console.error('Error adding notification:', error);
        return throwError('Error adding notification, please try again later.');
      })
    );
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting notification:', error);
        return throwError('Error deleting notification, please try again later.');
      })
    );
  }
}
