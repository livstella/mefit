import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day2ProgramComponent } from './day2-program.component';

describe('Day2ProgramComponent', () => {
  let component: Day2ProgramComponent;
  let fixture: ComponentFixture<Day2ProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day2ProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day2ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
