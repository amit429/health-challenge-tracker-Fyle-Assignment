import { Component, Input, Output , EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-workout-dashboard-graph-view',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './workout-dashboard-graph-view.component.html',
  styleUrl: './workout-dashboard-graph-view.component.css'
})
export class WorkoutDashboardGraphViewComponent implements OnChanges {

  @Input() uniqueWorkoutTypes : string[] = [];
  @Input() workoutMinutes : number[] = [];
  @Input() users : User[] = [];
  selectedUser : User | null = { id: 0, name: "Please Select a User", workouts: [] };

  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes',
          font: {
            size: 18, // Increase font size for Y-axis title
          },
        },
        ticks: {
          font: {
            size: 15, // Increase font size for Y-axis labels
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Workout Type',
          font: {
            size: 18,
          }
        },
        ticks: {
          font: {
            size: 15,
          }
        }
      },
    },
  };

  @Output() selectedUserChange = new EventEmitter<User>();

  onSelectUser(user : User) {
    this.selectedUser = user;
    this.selectedUserChange.emit(user);
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['uniqueWorkoutTypes'] || changes['workoutMinutes']) {
        this.chartData = {
          labels: this.uniqueWorkoutTypes,
          datasets: [
            {
              data: this.workoutMinutes,
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
            }
          ]
        };
      }
  }

}
