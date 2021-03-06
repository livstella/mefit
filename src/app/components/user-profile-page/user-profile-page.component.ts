import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { userProfileService } from 'src/app/services/user-profile-page.service';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
})
export class UserProfilePageComponent implements OnInit {
  constructor(
    private readonly userProfileService: userProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfileService.fetchUser();
    this.userProfileService.fetchProfile();
  }

  get user(): User | null {
    return this.userProfileService.userData();
  }
  get userId(): number | null {
    return this.userProfileService.userId();
  }

  get profile(): Profile | null {
    return this.userProfileService.profileData();
  }

  toDashBoard() {
    this.router.navigateByUrl('/dashboard');
  }
}
