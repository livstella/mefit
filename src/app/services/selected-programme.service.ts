import { Injectable } from '@angular/core';
import { Programme } from '../models/programme.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedProgrammeService {
  private _programme: Programme | null = null;
  private _programmeWorkouts: any | null = null;

  public setProgramme(programme: Programme) {
    this._programme = programme;
  }

  public programme(): Programme | null {
    return this._programme;
  }
  public setprogrammeWorkouts(workouts: any) {
    this._programmeWorkouts = workouts;
  }

  public programmeWorkouts(): any | null {
    return this._programmeWorkouts;
  }
}
