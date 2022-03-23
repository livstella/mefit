import { Component, OnInit } from '@angular/core';
import { Programme } from 'src/app/models/programme.model';
import { SelectedProgrammeService } from 'src/app/services/selected-programme.service';

@Component({
  selector: 'app-selected-programme',
  templateUrl: './selected-programme.component.html',
  styleUrls: ['./selected-programme.component.css'],
})
export class SelectedProgrammeComponent {
  constructor(
    private readonly selectedProgrammeService: SelectedProgrammeService
  ) {}

  get programme(): Programme | null {
    return this.selectedProgrammeService.programme();
  }

  get programmeWorkouts(): any | null {
    return this.selectedProgrammeService.programmeWorkouts();
  }
}
