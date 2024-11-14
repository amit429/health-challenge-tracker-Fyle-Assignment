import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { LocalStorageService } from './local-storage.service';
import { User, Workout, TableData } from '../models/user.model';
import mockData from '../../mock-data/user-mock-data.json';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let localStorageServiceMock: jest.Mocked<LocalStorageService>;

  const mockDate = new Date('2024-01-01');

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John',
      workouts: [
        { type: 'Running', minutes: 30},
        { type: 'Cycling', minutes: 45}
      ]
    },
    {
      id: 2,
      name: 'Jane',
      workouts: [
        { type: 'Swimming', minutes: 60}
      ]
    }
  ];

  beforeEach(() => {
    localStorageServiceMock = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        { provide: LocalStorageService, useValue: localStorageServiceMock }
      ]
    });

    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return users from localStorage when data exists', () => {
      localStorageServiceMock.getItem.mockReturnValue(mockUsers);
      const result = service.getUsers();
      expect(result).toEqual(mockUsers);
      expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('userData');
    });

    it('should return empty array when no data in localStorage', () => {
      localStorageServiceMock.getItem.mockReturnValue(null);
      const result = service.getUsers();
      expect(result).toEqual([]);
      expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('userData');
    });
  });

  describe('saveUsers', () => {
    it('should save users to localStorage', () => {
      service.saveUsers(mockUsers);
      expect(localStorageServiceMock.setItem).toHaveBeenCalledWith('userData', mockUsers);
    });
  });

  describe('addOrUpdateUser', () => {
    it('should update existing user with new workout', () => {
      localStorageServiceMock.getItem.mockReturnValue([...mockUsers]);
      const newWorkout: Workout = {
        type: 'Yoga',
        minutes: 20
      };

      service.addorUpdateUser('John', newWorkout);

      const setItemCalls = localStorageServiceMock.setItem.mock.calls;
      expect(setItemCalls.length).toBeGreaterThan(0);
      
      const [_, savedUsers] = setItemCalls[0] as [string, User[]];
      const updatedUser = savedUsers.find(u => u.name === 'John');
      
      expect(updatedUser).toBeDefined();
      expect(updatedUser?.workouts).toBeDefined();
      expect(updatedUser?.workouts.length).toBe(3);
      
      // Check if the new workout was added
      const addedWorkout = updatedUser?.workouts.find(w => w.type === 'Yoga');
      expect(addedWorkout).toBeDefined();
      expect(addedWorkout?.minutes).toBe(20);
    });

    it('should add new user with workout when user does not exist', () => {
      localStorageServiceMock.getItem.mockReturnValue([...mockUsers]);
      const newWorkout: Workout = {
        type: 'Yoga',
        minutes: 20
      };

      service.addorUpdateUser('Bob', newWorkout);

      const setItemCalls = localStorageServiceMock.setItem.mock.calls;
      expect(setItemCalls.length).toBeGreaterThan(0);
      
      const [_, savedUsers] = setItemCalls[0] as [string, User[]];
      const newUser = savedUsers.find(u => u.name === 'Bob');
      
      expect(newUser).toBeDefined();
      expect(newUser?.id).toBe(3);
      expect(newUser?.workouts.length).toBe(1);
      expect(newUser?.workouts[0].type).toBe('Yoga');
      expect(newUser?.workouts[0].minutes).toBe(20);
    });

    it('should create user with id 1 when users array is empty', () => {
      localStorageServiceMock.getItem.mockReturnValue([]);
      const newWorkout: Workout = {
        type: 'Yoga',
        minutes: 20
      };

      service.addorUpdateUser('Bob', newWorkout);

      const setItemCalls = localStorageServiceMock.setItem.mock.calls;
      expect(setItemCalls.length).toBeGreaterThan(0);
      
      const [_, savedUsers] = setItemCalls[0] as [string, User[]];
      const newUser = savedUsers.find(u => u.name === 'Bob');
      
      expect(newUser).toBeDefined();
      expect(newUser?.id).toBe(1);
      expect(newUser?.workouts.length).toBe(1);
      expect(newUser?.workouts[0].type).toBe('Yoga');
      expect(newUser?.workouts[0].minutes).toBe(20);
    });
  });

  describe('getUsersForTable', () => {
    it('should return correct table data format', () => {
      localStorageServiceMock.getItem.mockReturnValue([...mockUsers]);
      
      const result = service.getUsersForTable();
      
      expect(result).toEqual([
        {
          name: 'John',
          workouts: 'Running, Cycling, Yoga',
          numberOfWorkouts: 3,
          totalMinutes: 95
        },
        {
          name: 'Jane',
          workouts: 'Swimming',
          numberOfWorkouts: 1,
          totalMinutes: 60
        }
      ]);
    });

    it('should handle users with duplicate workout types', () => {
      const usersWithDuplicates: User[] = [{
        id: 1,
        name: 'John',
        workouts: [
          { type: 'Running', minutes: 30},
          { type: 'Running', minutes: 30}
        ]
      }];
      
      localStorageServiceMock.getItem.mockReturnValue(usersWithDuplicates);
      
      const result = service.getUsersForTable();
      
      expect(result).toEqual([{
        name: 'John',
        workouts: 'Running',
        numberOfWorkouts: 1,
        totalMinutes: 60
      }]);
    });

    it('should handle empty users array', () => {
      localStorageServiceMock.getItem.mockReturnValue([]);
      
      const result = service.getUsersForTable();
      
      expect(result).toEqual([]);
    });
  });

  it('should load mock data and return table data when no users exist', () => {
    localStorageServiceMock.getItem.mockReturnValue([]);

    const expectedTableData: TableData[] = mockData.map(user => ({
      name: user.name,
      workouts: Array.from(new Set(user.workouts.map(workout => workout.type))).join(', '),
      numberOfWorkouts: Array.from(new Set(user.workouts.map(workout => workout.type))).length,
      totalMinutes: user.workouts.reduce((acc, workout) => acc + workout.minutes, 0)
    }));

    console.log('expectedTableData', expectedTableData);

    const result = service.loadMockData();

    expect(localStorageServiceMock.setItem).toHaveBeenCalledWith('userData', mockData);
    expect(result).toEqual(expectedTableData);
  });

  it('should load mock data and return table data when users already exist', () => {
    const existingUsers: User[] = [
      {
        id: 1,
        name: 'Existing User',
        workouts: [
          { type: 'Cardio', minutes: 30 }
        ]
      }
    ];
    localStorageServiceMock.getItem.mockReturnValue(existingUsers);

    const combinedUsers = [...existingUsers, ...mockData];
    const expectedTableData: TableData[] = combinedUsers.map(user => ({
      name: user.name,
      workouts: Array.from(new Set(user.workouts.map(workout => workout.type))).join(', '),
      numberOfWorkouts: Array.from(new Set(user.workouts.map(workout => workout.type))).length,
      totalMinutes: user.workouts.reduce((acc, workout) => acc + workout.minutes, 0)
    }));

    const result = service.loadMockData();

    expect(localStorageServiceMock.setItem).toHaveBeenCalledWith('userData', combinedUsers);
    expect(result).toEqual(expectedTableData);
  });
});