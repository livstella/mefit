import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitGoalComponent } from './commit-goal.component';

describe('CommitGoalComponent', () => {
  let component: CommitGoalComponent;
  let fixture: ComponentFixture<CommitGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
