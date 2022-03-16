import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedProgrammeComponent } from './selected-programme.component';

describe('SelectedProgrammeComponent', () => {
  let component: SelectedProgrammeComponent;
  let fixture: ComponentFixture<SelectedProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedProgrammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
