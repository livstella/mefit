import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class exercisePageService {
  static exercise(): any {
    throw new Error('Method not implemented.');
  }
  private _exercises: Exercise[] = [];
  private _error: string = '';

  constructor(private readonly http: HttpClient) {}

  public fetchExercise(): void {
    this.http
      .get<Exercise[]>('https://mefitbackend-ajlm.herokuapp.com/exercise')
      .subscribe(
        (exercise) => {
          this._exercises = exercise;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public exercise(): Exercise[] {
    return this._exercises;
  }
  public error(): string {
    return this._error;
  }
}
