import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FilterDropdownComponent } from '../../shared/filter-dropdown/filter-dropdown.component';
import { WorkoutDialogFormComponent } from '../Components/workout-dialog-form/workout-dialog-form.component';
import { TableData, User, Workout } from '../../core/models/user.model';
import { WorkoutService } from '../../core/services/workout.service';
import { WorkoutTableViewComponent } from '../Components/workout-table-view/workout-table-view.component';
import { WorkoutUserDialogViewComponent } from '../Components/workout-user-dialog-view/workout-user-dialog-view.component';

@Component({
  selector: 'app-workout-tracker-page',
  standalone: true,
  imports: [
    SearchBarComponent,
    FilterDropdownComponent,
    WorkoutDialogFormComponent,
    WorkoutTableViewComponent,
    WorkoutUserDialogViewComponent,
  ],
  templateUrl: './workout-tracker-page.component.html',
  styleUrl: './workout-tracker-page.component.css',
})
export class WorkoutTrackerPageComponent implements OnInit {

  searchValue: string = '';
  workoutType: string = '';
  workoutTypes: string[] = [];
  tableData: TableData[] = [];
  userWorkoutData: User | null = null;
  userDataDialogDisplay: boolean = false;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getTableData();
  }

  onFilterChange(workoutType: any) {
    this.workoutTypes = workoutType.map((workout : any) => workout.value);
    console.log('Workout Types:', this.workoutTypes);
    this.filterAndSearchTableData();
  }

  onSearch(searchValue: string) {
    this.searchValue = searchValue;
    const users = this.workoutService.getUsers();
    users.filter((user) =>
      user.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.filterAndSearchTableData();
  }

  filterAndSearchTableData() {
    const users = this.workoutService.getUsers();
    this.tableData = users
      .filter(
        (user) =>
          // Check if there is no filter or if the user's workouts include any of the selected workout types
          (!this.workoutTypes || this.workoutTypes.length === 0 || 
            user.workouts.some(
              (workout) => this.workoutTypes.includes(workout.type)
            )) &&
          // Check if the user's name matches the search query
          (!this.searchValue ||
            user.name.toLowerCase().includes(this.searchValue.toLowerCase()))
      )
      .map((user) => {
        return {
          name: user.name,
          workouts: Array.from(
            new Set(user.workouts.map((workout) => workout.type))
          ).join(', '),
          numberOfWorkouts: Array.from(
            new Set(user.workouts.map((workout) => workout.type))
          ).length,
          totalMinutes: user.workouts.reduce(
            (acc, workout) => acc + workout.minutes,
            0
          ),
        };
      });
  }
  
  

  onWorkoutSubmit(data: { name: string; workout: Workout }) {
    this.workoutService.addorUpdateUser(data.name, data.workout);
    this.filterAndSearchTableData();
  }

  getTableData() {
    this.tableData = this.workoutService.getUsersForTable();
  }

  loadMockData() {
    this.tableData = this.workoutService.loadMockData();
  }

  onRowSelect(data: TableData) {
    const user = this.workoutService
      .getUsers()
      .find((user) => user.name === data.name);

    if (user) {
      console.log('User:', user);
      const uniqueWorkouts = user.workouts.reduce((acc, workout) => {
        const existingWorkout = acc.find((item) => item.type === workout.type);

        if (existingWorkout) {
          existingWorkout.minutes += workout.minutes;
        } else {
          acc.push({
            type: workout.type,
            minutes: workout.minutes,
          });
        }

        return acc;
      }, [] as { type: string; minutes: number }[]);

      const userDetails = {
        id: user.id,
        name: user.name,
        workouts: uniqueWorkouts,
      };

      this.userWorkoutData = userDetails;
      this.userDataDialogDisplay = false;
      setTimeout(() => {
        this.userDataDialogDisplay = true;
      }, 0);
      console.log('User Details:', userDetails);
    } else {
      this.userWorkoutData = null;
    }
  }
}
