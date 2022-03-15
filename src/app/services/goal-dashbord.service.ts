import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class GoalDashbordService {

  public exercises: Exercise[] = [];
  public error: string = '';
  apiURL = 'https://mefitbackend-ajlm.herokuapp.com';

  constructor(private readonly http: HttpClient) { }

  //---get excersizes
  public fetchAllExercise(): Exercise[]  {
    this.http
      .get<Exercise[]>(
        'https://mefitbackend-ajlm.herokuapp.com/exercise'
      )
      .subscribe(
        (exercise) => {
          this.exercises = exercise;
        },
        (error: HttpErrorResponse) => {
          this.error = error.message;
        }
      );
    return this.exercises;
  }
  //---get workouts

  //---get programs
}
