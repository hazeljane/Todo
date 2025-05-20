// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  studentProfile: any;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getProfile().subscribe(
      (data) => {
        this.studentProfile = data;
        console.log('Student Profile:', this.studentProfile);
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
}
