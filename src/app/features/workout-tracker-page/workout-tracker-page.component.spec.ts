import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTrackerPageComponent } from './workout-tracker-page.component';

describe('WorkoutTrackerPageComponent', () => {
  let component: WorkoutTrackerPageComponent;
  let fixture: ComponentFixture<WorkoutTrackerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTrackerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutTrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
