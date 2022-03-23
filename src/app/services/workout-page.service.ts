import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutPageService {
  private _workouts: Workout[] = [];
  private _error: string = '';

  constructor(private readonly http: HttpClient) {}

  public fetchWorkout(): void {
    this.http
      .get<Workout[]>('https://mefitbackend-ajlm.herokuapp.com/workout')
      .subscribe(
        (workouts) => {
          this._workouts = workouts;
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public workout(): Workout[] {
    return this._workouts;
  }
  public error(): string {
    return this._error;
  }
}
