import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingProgramComponent } from './picking-program.component';

describe('PickingProgramComponent', () => {
  let component: PickingProgramComponent;
  let fixture: ComponentFixture<PickingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickingProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
