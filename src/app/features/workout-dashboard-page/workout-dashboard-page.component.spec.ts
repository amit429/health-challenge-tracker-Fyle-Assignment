import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDashboardPageComponent } from './workout-dashboard-page.component';

describe('WorkoutDashboardPageComponent', () => {
  let component: WorkoutDashboardPageComponent;
  let fixture: ComponentFixture<WorkoutDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDashboardPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
