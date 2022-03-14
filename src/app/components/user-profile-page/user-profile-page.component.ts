import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { userProfileService } from '../../services/user-profile-page-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css'],
})
export class UserProfilePageComponent implements OnInit {

  constructor(private readonly userProfileService: userProfileService, private router: Router) {}


  ngOnInit(): void {
    this.userProfileService.fetchUser();
  }

  get user(): User[] {
    return this.userProfileService.user();
  }

  toDashBoard(){
    this.router.navigateByUrl('/dashboard');
  }

  toDashBoard(){
    this.router.navigateByUrl('/dashboard');
  }
}
