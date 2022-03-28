import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day5ButtonsComponent } from './day5-buttons.component';

describe('Day5ButtonsComponent', () => {
  let component: Day5ButtonsComponent;
  let fixture: ComponentFixture<Day5ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day5ButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day5ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
