import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";
import { FilterDropdownComponent } from "../../shared/filter-dropdown/filter-dropdown.component";
import { WorkoutDialogFormComponent } from "../Components/workout-dialog-form/workout-dialog-form.component";
import { TableData, Workout } from '../../core/models/user.model';
import { WorkoutService } from '../../core/services/workout.service';

@Component({
  selector: 'app-workout-tracker-page',
  standalone: true,
  imports: [SearchBarComponent, FilterDropdownComponent, WorkoutDialogFormComponent],
  providers: [WorkoutService],
  templateUrl: './workout-tracker-page.component.html',
  styleUrl: './workout-tracker-page.component.css'
})
export class WorkoutTrackerPageComponent implements OnInit {
  
  searchValue: string = '';
  workoutType: any = null;
  tableData: TableData[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getTableData();
  }
  
  onFilterChange(workoutType: any) {
    this.workoutType = workoutType;
    console.log(this.workoutType);
    this.filterAndSearchTableData();
  }
  
  onSearch(searchValue: string) {
    this.searchValue = searchValue;
    console.log(this.searchValue);
    this.filterAndSearchTableData();
  }

  filterAndSearchTableData() {
    const users = this.workoutService.getUsers();

    this.tableData = users
      .filter(user => 
        (!this.workoutType || user.workouts.some(workout => workout.type === this.workoutType)) &&
        (!this.searchValue || user.name.toLowerCase().includes(this.searchValue.toLowerCase()))
      )
      .map(user => {
        return {
          name: user.name,
          workouts: Array.from(new Set(user.workouts.map(workout => workout.type))).join(', '),
          numberOfWorkouts: Array.from(new Set(user.workouts.map(workout => workout.type))).length,
          totalMinutes: user.workouts.reduce((acc, workout) => acc + workout.minutes, 0)
        };
      });

      console.log(this.tableData);
  }
  
  onWorkoutSubmit(data: {name: string; workout: Workout}) {
    console.log(data);
    this.workoutService.addorUpdateUser(data.name, data.workout);
    this.filterAndSearchTableData();
  }

  getTableData() {
    this.tableData = this.workoutService.getUsersForTable();
    console.log(this.tableData);
  }
}
