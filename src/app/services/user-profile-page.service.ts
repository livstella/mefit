import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class userProfileService {
  private _user: User | null = null;
  private _error: string = '';

  constructor(private readonly http: HttpClient) {}

  //Get request on /user/1
  //Should be updated to fetch one user where id=sessionStorage.getItem(currentUser)
  //Maybe email..?
  public fetchUser(): void {
    this.http
      .get<User>('https://mefitbackend-ajlm.herokuapp.com/user/1')
      .subscribe(
        (user) => {
          this._user = user;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public user(): User | null {
    return this._user;
  }

  public error(): string {
    return this._error;
  }
}
