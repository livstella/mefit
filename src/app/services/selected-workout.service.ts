import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedWorkoutService {
  private _workout: Workout | null = null;
  private _workoutSets: any | null = null;

  public setWorkout(workout: Workout) {
    this._workout = workout;
  }

  public workout(): Workout | null {
    return this._workout;
  }

  public setWorkoutSets(sets: any) {
    this._workoutSets = sets;
  }

  public workoutSets(): any | null {
    return this._workoutSets;
  }
}
