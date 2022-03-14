import { Component, OnInit } from '@angular/core';
import { SelectedWorkoutService } from 'src/app/services/selected-workout.service';
import { Workout } from '../../models/workout.model';
import { WorkoutPageService } from '../../services/workout-page.service';

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrls: ['./workout-page.component.css'],
})
export class WorkoutPageComponent implements OnInit {
  //Injects the services needed
  constructor(
    private readonly workoutPageService: WorkoutPageService,
    private readonly selectedWorkoutService: SelectedWorkoutService
  ) {}

  ngOnInit(): void {
    //Fetches all workouts
    this.workoutPageService.fetchWorkout();
  }
  get workouts(): Workout[] {
    return this.workoutPageService.workout();
  }

  onWorkoutClicked(workout:Workout):void{

    this.selectedWorkoutService.setWorkout(workout);
  }
}
