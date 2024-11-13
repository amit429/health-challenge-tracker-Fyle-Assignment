import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDashboardGraphViewComponent } from './workout-dashboard-graph-view.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

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

  it('should emit select user on selectUser', () => {
    jest.spyOn(component.selectedUserChange, 'emit');
    component.onSelectUser({ id: 1, name: 'test', workouts: [] });
    if (component.selectedUser) {
      expect(component.selectedUserChange.emit).toHaveBeenCalledWith({ id: 1, name: 'test', workouts: [] });
    }
  });

  it('should update chartData when uniqueWorkoutTypes or workoutMinutes change', () => {
    // Arrange: Set the input values and trigger ngOnChanges
    const uniqueWorkoutTypes = ['Running', 'Swimming', 'Cycling'];
    const workoutMinutes = [30, 45, 60];
    component.uniqueWorkoutTypes = uniqueWorkoutTypes;
    component.workoutMinutes = workoutMinutes;

    // Act: Simulate changes and call ngOnChanges
    const changes: SimpleChanges = {
      uniqueWorkoutTypes: new SimpleChange(null, uniqueWorkoutTypes, true),
      workoutMinutes: new SimpleChange(null, workoutMinutes, true),
    };
    component.ngOnChanges(changes);

    // Assert: Check that chartData is updated correctly
    expect(component.chartData).toEqual({
      labels: uniqueWorkoutTypes,
      datasets: [
        {
          data: workoutMinutes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
          ],
          borderWidth: 1,
        },
      ],
    });
  });

  it('should not update chartData if uniqueWorkoutTypes and workoutMinutes do not change', () => {
    // Act: Simulate no changes in uniqueWorkoutTypes and workoutMinutes
    const changes: SimpleChanges = {};

    // Call ngOnChanges with an empty changes object
    component.ngOnChanges(changes);

    // Assert: chartData should be undefined or retain previous state
    expect(component.chartData).toEqual({ "datasets": [], "labels": [] });
  });
});
