import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDashboardGraphViewComponent } from './workout-dashboard-graph-view.component';

describe('WorkoutDashboardGraphViewComponent', () => {
  let component: WorkoutDashboardGraphViewComponent;
  let fixture: ComponentFixture<WorkoutDashboardGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDashboardGraphViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutDashboardGraphViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
