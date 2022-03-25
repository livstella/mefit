import { Component, OnInit } from '@angular/core';
import { SelectedProgrammeService } from 'src/app/services/selected-programme.service';
import { Programme } from '../../models/programme.model';
import { ProgrammePageService } from '../../services/programme-page.service';
import { AccordionBasicComponent } from '../accordion-basic/accordion-basic.component';

@Component({
  selector: 'app-programme-page',
  templateUrl: './programme-page.component.html',
  styleUrls: ['./programme-page.component.css'],
})
export class ProgrammePageComponent implements OnInit {
  constructor(
    private readonly programmePageService: ProgrammePageService,
    private readonly selectedProgrammeService: SelectedProgrammeService
  ) {}

  ngOnInit(): void {
    //Fetches all Programmes
    this.programmePageService.fetchProgramme();
  }
  get programmes(): Programme[] {
    return this.programmePageService.programme();
  }

  onProgrammeClicked(programme: Programme): void {
    this.selectedProgrammeService.setProgramme(programme);
    this.selectedProgrammeService.setprogrammeWorkouts(programme.workouts);
  }
}
