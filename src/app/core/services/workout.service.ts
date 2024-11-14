import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User , Workout, TableData } from '../models/user.model';
import mockData from '../../mock-data/user-mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private localStorageKey = 'userData';
  private users: User[] = [];

  constructor(private localStorageService: LocalStorageService) { 
    this.users = this.getUsers();
  }

  //Fetches the user data from local storage
  getUsers(): User[] {
    const users = this.localStorageService.getItem<User[]>(this.localStorageKey);
    return users ? users : [];
  }

  //Saves the user data to local storage
  saveUsers(users: User[]): void {
    this.localStorageService.setItem(this.localStorageKey, users);
  }

  //Adds or Updates a user to the list of users
  addorUpdateUser(name: string , workout: Workout): void {
    const users = this.getUsers();
    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
      existingUser.workouts.push(workout);
    } else {
      const newUser: User = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        workouts: [workout]
      };
      users.push(newUser);
    }
    this.saveUsers(users);
  }

  //Fetch users for the table
  getUsersForTable(): TableData[] {
      const users = this.getUsers();
    return users.map(user => {
      return {
        name: user.name,
        workouts:  Array.from(new Set(user.workouts.map(workout => workout.type))).join(', '),
        numberOfWorkouts: Array.from(new Set(user.workouts.map(workout => workout.type))).length,
        totalMinutes: user.workouts.reduce((acc, workout) => acc + workout.minutes, 0)
      };
    });
  }

  loadMockData() : TableData[] {
    const users = this.getUsers();
    users.push(...mockData);
    this.saveUsers(users);
    return this.getUsersForTable();
  }
}
