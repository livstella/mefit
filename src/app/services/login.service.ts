import { HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Login} from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: Login[] = [];
  public testUser = {}

  private error: string = "";

  apiURL = ''
  apiKey = ''
  status: string | undefined;

  constructor(public readonly http: HttpClient){
  }

  //---check for user
  public queryUser(username:string): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`)
  }

  //---register users
  public setUserToApi(username:string): Observable<Login[]> {
    const headers = { 'X-API-Key': this.apiKey, 'Content-Type': 'application/json' };
    const body = {username: username, pokemon: []};
    let data = this.http.post<Login[]>(`${this.apiURL}/trainers?username=${username}`, JSON.stringify(body), {'headers':headers})
    return data
  }

}
