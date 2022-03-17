import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SelectedExerciseService {
  private _exercise: Exercise | null = null;
  private _safeVideo: SafeUrl | null = null;

  public setExercise(exercise: Exercise) {
    this._exercise = exercise;
  }

  public exercise(): Exercise | null {
    return this._exercise;
  }

  public setSafeVideo(videoLink: SafeUrl | null) {
    this._safeVideo = videoLink;
  }

  public safeVideo(): SafeResourceUrl | null {
    return this._safeVideo;
  }
}
