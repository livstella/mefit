import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class userProfileService {
  private _userData: User | null = null;
  private _profileData: Profile | null = null;
  private _error: string = '';
  private _userId: number = JSON.parse(
    sessionStorage.getItem('current-user') || '{}'
  ).id;
  private _profileId: number | null = null;

  constructor(private readonly http: HttpClient) {}

  //Fetches the user with the id from "current-user" in session storage
  //Setting the profileId commented out until update on backend
  public fetchUser(): void {
    this.http
      .get<User>(`https://mefitbackend-ajlm.herokuapp.com/user/11`)
      .subscribe(
        (user) => {
          this._userData = user;
          console.log(this._userId)
          //this._profileId=user.profile.id
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  //Gets profile with the id of the profileId from "current-user"
  // Should be updated to "${this._profileId}" rather than "1" when backend updated
  public fetchProfile(): void {
    this.http
      .get<Profile>(`https://mefitbackend-ajlm.herokuapp.com/profile/1`)
      .subscribe(
        (profile) => {
          this._profileData = profile;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public userData(): User | null {
    return this._userData;
  }
  public userId(): number | null {
    return this._userId;
  }

  public profileData(): Profile | null {
    return this._profileData;
  }

  public error(): string {
    return this._error;
  }
}
