import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedWorkoutComponent } from './selected-workout.component';

describe('SelectedWorkoutComponent', () => {
  let component: SelectedWorkoutComponent;
  let fixture: ComponentFixture<SelectedWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
