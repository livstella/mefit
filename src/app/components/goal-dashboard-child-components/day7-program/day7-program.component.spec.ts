import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day7ProgramComponent } from './day7-program.component';

describe('Day7ProgramComponent', () => {
  let component: Day7ProgramComponent;
  let fixture: ComponentFixture<Day7ProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day7ProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day7ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
