import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day7ButtonsComponent } from './day7-buttons.component';

describe('Day7ButtonsComponent', () => {
  let component: Day7ButtonsComponent;
  let fixture: ComponentFixture<Day7ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day7ButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day7ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
