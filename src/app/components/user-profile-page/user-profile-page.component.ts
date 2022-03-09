import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { userProfileService } from '../../services/user-profile-page-service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
})
export class UserProfilePageComponent implements OnInit {
  constructor(private readonly userProfileService: userProfileService) {}

  ngOnInit(): void {
    this.userProfileService.fetchUser();
  }

  get user(): User[] {
    return this.userProfileService.User();
  }
}
