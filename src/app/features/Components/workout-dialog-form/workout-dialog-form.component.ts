import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Workout } from '../../../core/models/user.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-workout-dialog-form',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    CommonModule,
    DialogModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './workout-dialog-form.component.html',
  styleUrl: './workout-dialog-form.component.css',
})
export class WorkoutDialogFormComponent {

  @Output() workoutAdded = new EventEmitter<{
    name: string;
    workout: Workout;
  }>();

  workoutTypes = [
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Yoga', value: 'Yoga' },
  ];

  name: string = '';
  
  workoutType: any = null;
  
  workoutMinutes: number | null = null;

  users: User[] = [];
  
  displayDialog: boolean = false;

  constructor(private messageService: MessageService) {}

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  addWorkout() {
    if (this.name && this.workoutType && this.workoutMinutes) {
      const workout: Workout = {
        type: this.workoutType.value,
        minutes: this.workoutMinutes,
      };
      this.workoutAdded.emit({ name: this.name, workout });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Workout added successfully',
      });
      this.name = '';
      this.workoutType = null;
      this.workoutMinutes = null;
      this.hideDialog();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all fields',
      });
    }
  }
}
