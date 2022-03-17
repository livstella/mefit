import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class userProfileService {
  private _userData: User | null = null;
  private _error: string = '';
  private _userId:number= JSON.parse(sessionStorage.getItem('current-user') || '{}').id;

  //    console.log();

  constructor(private readonly http: HttpClient) {}

  //Get request on /user/1
  //Should be updated to fetch one user where id=sessionStorage.getItem(currentUser)
  //Maybe email..?
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

  public user(): User | null {
    return this._userData;
    
  }
  public userId():number | null {
    return this._userId;
  }

  public error(): string {
    return this._error;
  }
}
