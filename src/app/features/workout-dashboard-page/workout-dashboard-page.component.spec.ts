import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutDashboardPageComponent } from './workout-dashboard-page.component';
import { WorkoutService } from '../../core/services/workout.service';
import { WorkoutDashboardGraphViewComponent } from '../Components/workout-dashboard-graph-view/workout-dashboard-graph-view.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

// Mock data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Running', minutes: 45 },
      { type: 'Cycling', minutes: 60 },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    workouts: [
      { type: 'Yoga', minutes: 45 },
      { type: 'Running', minutes: 30 },
    ],
  },
];

describe('WorkoutDashboardPageComponent', () => {
  let component: WorkoutDashboardPageComponent;
  let fixture: ComponentFixture<WorkoutDashboardPageComponent>;
  let workoutService: jest.Mocked<WorkoutService>;

  beforeEach(async () => {
    const workoutServiceSpy = {
      getUsers: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [WorkoutDashboardPageComponent, WorkoutDashboardGraphViewComponent],
      providers: [
        {
          provide: WorkoutService,
          useValue: workoutServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA], // This helps avoid errors with unknown elements/properties
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jest.Mocked<WorkoutService>;

    fixture = TestBed.createComponent(WorkoutDashboardPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component', () => {
    it('ngOnInit: should load users on init', () => {
      const loadUserSpy = jest.spyOn(component, 'loadUsers');
      component.ngOnInit();

      expect(loadUserSpy).toHaveBeenCalledTimes(1);
    });

    it('loadUsers: should load users from the service', () => {
      workoutService.getUsers.mockReturnValue(mockUsers);

      component.loadUsers();

      expect(workoutService.getUsers).toHaveBeenCalledTimes(1);
      expect(component.users).toEqual(mockUsers);
    });

    it('onSelectUser: should update selected user and chart data when user is selected', () => {
      component.onSelectUser(mockUsers[0]);

      expect(component.selectedUser).toBe(mockUsers[0]);
      expect(component.uniqueWorkoutTypes).toEqual(['Running', 'Cycling']);
      expect(component.workoutMinutes).toEqual([75, 60]);
    });

    it('should calculate workout minutes correctly for different workout types', () => {
      const testWorkouts = [
        { type: 'Running', minutes: 30 },
        { type: 'Running', minutes: 20 },
        { type: 'Yoga', minutes: 45 },
        { type: 'Running', minutes: 25 },
      ];

      component.updateChartData(testWorkouts);

      expect(component.uniqueWorkoutTypes).toEqual(['Running', 'Yoga']);
      expect(component.workoutMinutes).toEqual([75, 45]);
    });

    it('should handle empty workout data', () => {
      const emptyUser = {
        id: 3,
        name: 'New User',
        workouts: [],
      };

      component.onSelectUser(emptyUser);

      expect(component.uniqueWorkoutTypes).toEqual([]);
      expect(component.workoutMinutes).toEqual([]);
    });

    it('should handle multiple users with different workout types', () => {
      workoutService.getUsers.mockReturnValue(mockUsers);

      component.loadUsers();

      expect(component.users.length).toBe(2);
      expect(component.users.length).toBe(2);

      component.onSelectUser(component.users[0]);
      expect(component.uniqueWorkoutTypes).toEqual(['Running', 'Cycling']);

      component.onSelectUser(component.users[1]);
      expect(component.uniqueWorkoutTypes).toEqual(['Yoga', 'Running']);
    });
  });
});
