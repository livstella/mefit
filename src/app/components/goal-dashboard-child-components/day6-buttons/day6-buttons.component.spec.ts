import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day6ButtonsComponent } from './day6-buttons.component';

describe('Day6ButtonsComponent', () => {
  let component: Day6ButtonsComponent;
  let fixture: ComponentFixture<Day6ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day6ButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day6ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
