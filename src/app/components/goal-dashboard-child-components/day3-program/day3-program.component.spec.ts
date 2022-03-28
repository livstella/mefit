import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day3ProgramComponent } from './day3-program.component';

describe('Day3ProgramComponent', () => {
  let component: Day3ProgramComponent;
  let fixture: ComponentFixture<Day3ProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day3ProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day3ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
