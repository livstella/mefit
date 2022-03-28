import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day1ButtonsComponent } from './day1-buttons.component';

describe('Day1ButtonsComponent', () => {
  let component: Day1ButtonsComponent;
  let fixture: ComponentFixture<Day1ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day1ButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day1ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
