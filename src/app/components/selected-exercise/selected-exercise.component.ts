import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { SelectedExerciseService } from 'src/app/services/selected-exercise.service';

@Component({
  selector: 'app-selected-exercise',
  templateUrl: './selected-exercise.component.html',
  styleUrls: ['./selected-exercise.component.css']
})
export class SelectedExerciseComponent  {

  constructor(private readonly selectedExerciseService:SelectedExerciseService) { }

 get exercise(): Exercise|null{
   return this.selectedExerciseService.exercise()
 }
}
