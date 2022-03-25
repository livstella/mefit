import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day3ButtonsComponent } from './day3-buttons.component';

describe('Day3ButtonsComponent', () => {
  let component: Day3ButtonsComponent;
  let fixture: ComponentFixture<Day3ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day3ButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day3ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
