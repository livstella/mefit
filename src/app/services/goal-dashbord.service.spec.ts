import { TestBed } from '@angular/core/testing';

import { GoalDashbordService } from './goal-dashbord.service';

describe('GoalDashbordService', () => {
  let service: GoalDashbordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalDashbordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
