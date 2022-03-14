import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';


@Injectable({
    providedIn: 'root',
  })

  export class SelectedWorkoutService{
    private _workout: Workout|null=null;

    public setWorkout(workout:Workout){
        this._workout=workout;
    }

    public workout():Workout|null{
        return this._workout;
    }
  }