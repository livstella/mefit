import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthPageComponent } from './not-auth-page.component';

describe('NotAuthPageComponent', () => {
  let component: NotAuthPageComponent;
  let fixture: ComponentFixture<NotAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
