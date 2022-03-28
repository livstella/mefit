import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day4ButtonsComponent } from './day4-buttons.component';

describe('Day4ButtonsComponent', () => {
  let component: Day4ButtonsComponent;
  let fixture: ComponentFixture<Day4ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day4ButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day4ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
