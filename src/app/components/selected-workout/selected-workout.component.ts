import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/models/workout.model';
import { SelectedWorkoutService } from 'src/app/services/selected-workout.service';

@Component({
  selector: 'app-selected-workout',
  templateUrl: './selected-workout.component.html',
  styleUrls: ['./selected-workout.component.css'],
})
export class SelectedWorkoutComponent {
  constructor(
    private readonly selectedWorkoutService: SelectedWorkoutService
  ) {}

  get workout(): Workout | null {
    return this.selectedWorkoutService.workout();
  }

  get workoutSets(): any | null {
    return this.selectedWorkoutService.workoutSets();
  }
}
