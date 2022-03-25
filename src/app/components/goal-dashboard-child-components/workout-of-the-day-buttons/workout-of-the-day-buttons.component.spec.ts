import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutOfTheDayButtonsComponent } from './workout-of-the-day-buttons.component';

describe('WorkoutOfTheDayButtonsComponent', () => {
  let component: WorkoutOfTheDayButtonsComponent;
  let fixture: ComponentFixture<WorkoutOfTheDayButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutOfTheDayButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutOfTheDayButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
