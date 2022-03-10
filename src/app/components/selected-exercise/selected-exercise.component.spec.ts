import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedExerciseComponent } from './selected-exercise.component';

describe('SelectedExerciseComponent', () => {
  let component: SelectedExerciseComponent;
  let fixture: ComponentFixture<SelectedExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
