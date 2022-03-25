import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutOfTheDayOptionsComponent } from './workout-of-the-day-options.component';

describe('WorkoutOfTheDayOptionsComponent', () => {
  let component: WorkoutOfTheDayOptionsComponent;
  let fixture: ComponentFixture<WorkoutOfTheDayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutOfTheDayOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutOfTheDayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
