import { Component, OnInit } from '@angular/core';
import { SelectedExerciseService } from 'src/app/services/selected-exercise.service';
import { Exercise } from '../../models/exercise.model';
import { exercisePageService } from '../../services/exercise-page.service';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css'],
})
export class ExercisePageComponent implements OnInit {
  //Injects the services needed
  constructor(
    private readonly exercisePageService: exercisePageService,
    private readonly selectedExerciseService: SelectedExerciseService
  ) {}

  ngOnInit(): void {
    //Fetches all exercises
    this.exercisePageService.fetchExercise();
  }
  get exercises(): Exercise[] {
    return this.exercisePageService.exercise();
  }

  onExerciseClicked(exercise:Exercise):void{

    this.selectedExerciseService.setExercise(exercise);
  }
}
