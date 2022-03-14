import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';


@Injectable({
    providedIn: 'root',
  })

  export class SelectedExerciseService{
    private _exercise: Exercise|null=null;

    public setExercise(exercise:Exercise){
        this._exercise=exercise;
    }

    public exercise():Exercise|null{
        return this._exercise;
    }
  }