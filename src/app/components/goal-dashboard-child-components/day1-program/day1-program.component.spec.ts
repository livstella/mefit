import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day1ProgramComponent } from './day1-program.component';

describe('Day1ProgramComponent', () => {
  let component: Day1ProgramComponent;
  let fixture: ComponentFixture<Day1ProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day1ProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day1ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
