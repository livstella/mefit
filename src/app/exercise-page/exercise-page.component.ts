import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import { exercisePageService } from '../services/exercise-page.service';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {

  constructor(private readonly exercisePageService: exercisePageService) { }

  ngOnInit(): void {
    this.exercisePageService.fetchExercise();
  }
get exercises():Exercise[]{
  return this.exercisePageService.exercise();
}
}
