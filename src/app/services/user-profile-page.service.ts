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
  private _userId: number = 1;
  /*JSON.parse(
    sessionStorage.getItem('current-user') || '{}'
  ).id;*/
  private _profileId: number = 1;
  /*JSON.parse(
    sessionStorage.getItem('current-user') || '{}'
  ).profile.id;*/

  constructor(private readonly http: HttpClient) {}

  //Fetches the user with the id from "current-user" in session storage
  //Setting the profileId commented out until update on backend
  public fetchUser(): void {
    this.http
      .get<User>(`https://mefitbackend-ajlm.herokuapp.com/user/${this._userId}`)
      .subscribe(
        (user) => {
          this._userData = user;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  //Gets profile with the id of the profileId from "current-user"
  public fetchProfile(): void {
    this.http
      .get<Profile>(
        `https://mefitbackend-ajlm.herokuapp.com/profile/${this._profileId}`
      )
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
