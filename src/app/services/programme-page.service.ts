import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Programme } from '../models/programme.model';

@Injectable({
  providedIn: 'root',
})
export class ProgrammePageService {
  private _programmes: Programme[] = [];
  private _error: string = '';

  constructor(private readonly http: HttpClient) {}

  public fetchProgramme(): void {
    this.http
      .get<Programme[]>(
        'https://mefitbackend-ajlm.herokuapp.com/programme'
      )
      .subscribe(
        (programme) => {
          this._programmes = programme;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public programme():Programme[]{
      return this._programmes;
  }
  public error(): string {
    return this._error;
  }


}
