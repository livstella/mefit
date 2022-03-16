import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { SelectedExerciseService } from 'src/app/services/selected-exercise.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-selected-exercise',
  templateUrl: './selected-exercise.component.html',
  styleUrls: ['./selected-exercise.component.css'],
})
export class SelectedExerciseComponent {
  sanitizedVideo: SafeResourceUrl | null = null;

  constructor(
    private readonly selectedExerciseService: SelectedExerciseService,
    private sanitizer: DomSanitizer
  ) {}

  get exercise(): Exercise | null {
    return this.selectedExerciseService.exercise();
  }

  get safeVideo(): SafeResourceUrl | null {
    return this.selectedExerciseService.safeVideo();
  }
}
