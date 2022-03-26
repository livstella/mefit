import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day6ProgramComponent } from './day6-program.component';

describe('Day6ProgramComponent', () => {
  let component: Day6ProgramComponent;
  let fixture: ComponentFixture<Day6ProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day6ProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day6ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
