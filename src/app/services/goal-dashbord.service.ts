import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { Programme } from '../models/programme.model';
import { Sets } from '../models/sets.model';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class GoalDashbordService {

  public sets: Sets[] = [];
  public error: string = '';


  constructor(private readonly http: HttpClient) { }

  //---get set by id
  public fetchSetById(id:number): Observable<Sets[]>  {
    return this.http.get<Sets[]>(`https://mefitbackend-ajlm.herokuapp.com/set/${id}`)
  }

  //---get workout by id
  public fetchWorkoutById(id:number): Observable<Workout[]>  {
    return this.http.get<Workout[]>(`https://mefitbackend-ajlm.herokuapp.com/workout/${id}`)
  }

  //---get program by id
  public fetchProgramById(id:number): Observable<Programme[]>  {
    return this.http.get<Programme[]>(`https://mefitbackend-ajlm.herokuapp.com/program/${id}`)
  }

  //---get exercise by id 
  public fetchExById(id:number): Observable<Exercise[]>  {
    return this.http.get<Exercise[]>(`https://mefitbackend-ajlm.herokuapp.com/exercise/${id}`)
  }

  //---get all exercises
  public fetchEx(): Observable<Array<Exercise[]>>  {
    return this.http.get<Array<Exercise[]>>(`https://mefitbackend-ajlm.herokuapp.com/exercise`)
  }

   //---get al workouts
   public fetchWork(): Observable<Workout[]>  {
    return this.http.get<Workout[]>(`https://mefitbackend-ajlm.herokuapp.com/workout`)
  }

   //---get all programs
   public fetchProgram(): Observable<Programme[]>  {
    return this.http.get<Programme[]>(`https://mefitbackend-ajlm.herokuapp.com/program`)
  }
}
