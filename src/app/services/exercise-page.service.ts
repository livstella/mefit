import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class exercisePageService {
  private _exercise: Exercise[] = [];
  private _error: string = '';

  constructor(private readonly http: HttpClient) {}

  public fetchExercise(): void {
    this.http
      .get<Exercise[]>(
        'https://mefitbackend-ajlm.herokuapp.com/getAllExercises'
      )
      .subscribe(
        (exercise) => {
          this._exercise = exercise;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public exercise():Exercise[]{
      return this._exercise;
  }
  public error(): string {
    return this._error;
  }


}
