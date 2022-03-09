import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class userProfileService {
  private user: User[] = [];
  private error: string = '';

  constructor(private readonly http: HttpClient) {}

  //Get request on /user. Assume it will get all users, therefore I am using and array of users. 
  //Should be updated to fetch one user where id=sessionStorage.getItem(currentUser)
  public fetchUser(): void {
    this.http
      .get<User[]>('https://mefitbackend-ajlm.herokuapp.com/user')
      .subscribe(
        (user) => {
          this.user = user;
        },
        (error: HttpErrorResponse) => {
          this.error = error.message;
        }
      );
  }
}
