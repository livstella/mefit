import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day2ButtonsComponent } from './day2-buttons.component';

describe('Day2ButtonsComponent', () => {
  let component: Day2ButtonsComponent;
  let fixture: ComponentFixture<Day2ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day2ButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day2ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
