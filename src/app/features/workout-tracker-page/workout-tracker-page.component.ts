import { Component } from '@angular/core';
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";
import { FilterDropdownComponent } from "../../shared/filter-dropdown/filter-dropdown.component";
import { WorkoutDialogFormComponent } from "../Components/workout-dialog-form/workout-dialog-form.component";
import { Workout } from '../../core/models/user.model';

@Component({
  selector: 'app-workout-tracker-page',
  standalone: true,
  imports: [SearchBarComponent, FilterDropdownComponent, WorkoutDialogFormComponent],
  templateUrl: './workout-tracker-page.component.html',
  styleUrl: './workout-tracker-page.component.css'
})
export class WorkoutTrackerPageComponent {
  
  searchValue: string = '';
  workoutType: any = null;
  
  onFilterChange(workoutType: any) {
    this.workoutType = workoutType;
    console.log(this.workoutType);
  }
  
  onSearch(searchValue: string) {
    this.searchValue = searchValue;
    console.log(this.searchValue);
  }
  
  onWorkoutSubmit($event: {name: string; workout: Workout}) {
    console.log($event);
  }
}
