import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitFinishComponent } from './commit-finish.component';

describe('CommitFinishComponent', () => {
  let component: CommitFinishComponent;
  let fixture: ComponentFixture<CommitFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitFinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
