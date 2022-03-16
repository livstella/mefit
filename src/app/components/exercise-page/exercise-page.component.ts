import { Component, OnInit } from '@angular/core';
import { SelectedExerciseService } from 'src/app/services/selected-exercise.service';
import { Exercise } from '../../models/exercise.model';
import { exercisePageService } from '../../services/exercise-page.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css'],
})
export class ExercisePageComponent implements OnInit {
  public sanitizedUrl: SafeResourceUrl | null = null;

  //Injects the services needed
  constructor(
    private readonly exercisePageService: exercisePageService,
    private readonly selectedExerciseService: SelectedExerciseService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    //Fetches all exercises
    this.exercisePageService.fetchExercise();
  }
  get exercises(): Exercise[] {
    return this.exercisePageService.exercise();
  }

  onExerciseClicked(exercise: Exercise): void {
    this.selectedExerciseService.setExercise(exercise);

    this.selectedExerciseService.setSafeVideo(
      this.sanitizer.bypassSecurityTrustResourceUrl(exercise.videoLink)
    );
    console.log(exercise);
  }
}
