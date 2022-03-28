import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day5ProgramComponent } from './day5-program.component';

describe('Day5ProgramComponent', () => {
  let component: Day5ProgramComponent;
  let fixture: ComponentFixture<Day5ProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day5ProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day5ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
