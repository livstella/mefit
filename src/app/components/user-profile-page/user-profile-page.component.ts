import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { userProfileService } from 'src/app/services/user-profile-page.service';

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
  }

  get user(): User | null {
    return this.userProfileService.user();
  }
  get userId(): number | null {
    return this.userProfileService.userId();
  }

  toDashBoard() {
    //this.router.navigateByUrl('/dashboard');
    console.log(this.user)
  }
}
