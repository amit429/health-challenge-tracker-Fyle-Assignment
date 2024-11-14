import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WorkoutTrackerPageComponent } from './workout-tracker-page.component';
import { WorkoutService } from '../../core/services/workout.service';
import { TableData, Workout } from '../../core/models/user.model';

describe('WorkoutTrackerPageComponent', () => {
  let component: WorkoutTrackerPageComponent;
  let fixture: ComponentFixture<WorkoutTrackerPageComponent>;
  let workoutService: jest.Mocked<WorkoutService>;

  beforeEach(async () => {
    const workoutServiceSpy = {
      getUsers: jest.fn().mockReturnValue([]),
      getUsersForTable: jest.fn().mockReturnValue([]),
      addorUpdateUser: jest.fn(),
      loadMockData: jest.fn().mockReturnValue([])
    };

    await TestBed.configureTestingModule({
      imports: [WorkoutTrackerPageComponent],
      providers: [{ provide: WorkoutService, useValue: workoutServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jest.Mocked<WorkoutService>;
    fixture = TestBed.createComponent(WorkoutTrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTableData on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTableData');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update workoutTypes and call filterAndSearchTableData on onFilterChange', () => {
    const spy = jest.spyOn(component, 'filterAndSearchTableData');
    const workoutType = [{ label: 'Cardio', value: 'Cardio' }, { label: 'Cycling', value: 'Cycling' }];
    component.onFilterChange(workoutType);
    expect(component.workoutTypes).toEqual(['Cardio', 'Cycling']);
    expect(spy).toHaveBeenCalled();
  });

  it('should update searchValue and call filterAndSearchTableData on onSearch', () => {
    const spy = jest.spyOn(component, 'filterAndSearchTableData');
    const searchValue = 'John';
    component.onSearch(searchValue);
    expect(component.searchValue).toBe('John');
    expect(spy).toHaveBeenCalled();
  });

  it('should call addorUpdateUser and filterAndSearchTableData on onWorkoutSubmit', () => {
    const spy = jest.spyOn(component, 'filterAndSearchTableData');
    const data = { name: 'John', workout: { type: 'Cardio', minutes: 30 } as Workout };
    component.onWorkoutSubmit(data);
    expect(workoutService.addorUpdateUser).toHaveBeenCalledWith('John', data.workout);
    expect(spy).toHaveBeenCalled();
  });

  it('should call getUsersForTable on getTableData', () => {
    component.getTableData();
    expect(workoutService.getUsersForTable).toHaveBeenCalled();
  });

  it('should filter and map tableData correctly in filterAndSearchTableData', () => {
    const users = [
      {
        id: 1,
        name: 'John',
        workouts: [
          { type: 'Cardio', minutes: 30 },
          { type: 'Strength', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane',
        workouts: [
          { type: 'Cardio', minutes: 20 },
          { type: 'Yoga', minutes: 60 }
        ]
      }
    ];
    workoutService.getUsers.mockReturnValue(users);

    component.workoutType = 'Cardio';
    component.searchValue = 'Jane';
    component.filterAndSearchTableData();

    expect(component.tableData).toEqual([
      {
        name: 'Jane',
        workouts: 'Cardio, Yoga',
        numberOfWorkouts: 2,
        totalMinutes: 80
      }
    ]);
  });

  it('should filter and map tableData correctly with no filters', () => {
    const users = [
      {
        id: 1,
        name: 'John',
        workouts: [
          { type: 'Cardio', minutes: 30 },
          { type: 'Strength', minutes: 45 }
        ]
      },
      {
        id : 2,
        name: 'Jane',
        workouts: [
          { type: 'Cardio', minutes: 20 },
          { type: 'Yoga', minutes: 60 }
        ]
      }
    ];
    workoutService.getUsers.mockReturnValue(users);

    component.workoutType = '';
    component.searchValue = '';
    component.filterAndSearchTableData();

    expect(component.tableData).toEqual([
      {
        name: 'John',
        workouts: 'Cardio, Strength',
        numberOfWorkouts: 2,
        totalMinutes: 75
      },
      {
        name: 'Jane',
        workouts: 'Cardio, Yoga',
        numberOfWorkouts: 2,
        totalMinutes: 80
      }
    ]);
  });

  it('should process selected row data correctly in onRowSelect', () => {
    const users = [
      {
        id: 1,
        name: 'John',
        workouts: [
          { type: 'Cardio', minutes: 30 },
          { type: 'Cardio', minutes: 20 },
          { type: 'Strength', minutes: 45 }
        ]
      }
    ];
    workoutService.getUsers.mockReturnValue(users);

    const data: TableData = { name: 'John', workouts: 'Cardio, Strength', numberOfWorkouts: 2, totalMinutes: 95 };
    component.onRowSelect(data);

    expect(component.userWorkoutData).toEqual({
      id: 1,
      name: 'John',
      workouts: [
        { type: 'Cardio', minutes: 50 },
        { type: 'Strength', minutes: 45 }
      ]
    });
    expect(component.userDataDialogDisplay).toBe(false);
    setTimeout(() => {
      expect(component.userDataDialogDisplay).toBe(true);
    },0);
  });

  it('should set userWorkoutData to null if user not found in onRowSelect', () => {
    workoutService.getUsers.mockReturnValue([]);

    const data: TableData = { name: 'John', workouts: 'Cardio, Strength', numberOfWorkouts: 2, totalMinutes: 95 };
    component.onRowSelect(data);

    expect(component.userWorkoutData).toBeNull();
  });

  it('should call loadMockData and set tableData on loadMockData', () => {
    const mockTableData: TableData[] = [
      { name: 'John', workouts: 'Cardio, Strength', numberOfWorkouts: 2, totalMinutes: 75 },
      { name: 'Jane', workouts: 'Cardio, Yoga', numberOfWorkouts: 2, totalMinutes: 80 }
    ];
    workoutService.loadMockData.mockReturnValue(mockTableData);

    component.loadMockData();

    expect(workoutService.loadMockData).toHaveBeenCalled();
    expect(component.tableData).toEqual(mockTableData);
  });

});