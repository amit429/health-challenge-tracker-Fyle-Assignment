import { Component , OnInit } from '@angular/core';
import { WorkoutDashboardGraphViewComponent } from "../Components/workout-dashboard-graph-view/workout-dashboard-graph-view.component";
import { WorkoutService } from '../../core/services/workout.service';
import { User, Workout } from '../../core/models/user.model';

@Component({
  selector: 'app-workout-dashboard-page',
  standalone: true,
  imports: [WorkoutDashboardGraphViewComponent],
  templateUrl: './workout-dashboard-page.component.html',
  styleUrl: './workout-dashboard-page.component.css'
})
export class WorkoutDashboardPageComponent implements OnInit {

  users : User[] = [];
  selectedUser : User | null = null;
  uniqueWorkoutTypes : string[] = [];
  workoutMinutes : number[] = [];

  constructor(private workoutService : WorkoutService) { }

  loadUsers(): void {
    this.users = this.workoutService.getUsers();
  }

  onSelectUser(user : User): void {
    this.selectedUser = user;
    this.updateChartData(user.workouts);
  }

  updateChartData(workouts: Workout[]){
    const uniqueWorkoutTypes = [...new Set(workouts.map(w => w.type))];
    const workoutMinutes = uniqueWorkoutTypes.map(
      type => workouts.filter(w => w.type === type).reduce((acc, w) => acc + w.minutes, 0)
    );
    this.uniqueWorkoutTypes = uniqueWorkoutTypes;
    this.workoutMinutes = workoutMinutes;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

}
