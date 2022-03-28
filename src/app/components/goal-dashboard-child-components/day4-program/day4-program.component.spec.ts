import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day4ProgramComponent } from './day4-program.component';

describe('Day4ProgramComponent', () => {
  let component: Day4ProgramComponent;
  let fixture: ComponentFixture<Day4ProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day4ProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day4ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
