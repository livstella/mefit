import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { first, Observable } from "rxjs";
import {Login} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: Login[] = [];
  public testUser = {}

  private error: string = "";

  apiURL = 'https://mefitbackend-ajlm.herokuapp.com'
  status: string | undefined;

  constructor(public readonly http: HttpClient){
  }

  //---check for user
  public queryUser(email:string): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.apiURL}/user?email=${email}`)
  }

  //---register users
  public setUserToApi(email:string, firstname:string, lastname:string, password:string): Observable<Login[]> {
    const headers = {'Content-Type': 'application/json' };
    const body = {email: email, firstname: firstname, lastname: lastname, password: password};
    let data = this.http.post<Login[]>(`${this.apiURL}/user`, JSON.stringify(body), {'headers':headers})
    return data
  }

}
