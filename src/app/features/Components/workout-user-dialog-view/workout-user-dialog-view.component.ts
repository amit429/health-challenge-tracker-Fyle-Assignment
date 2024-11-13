import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-workout-user-dialog-view',
  standalone: true,
  imports: [DialogModule, CommonModule, AvatarModule],
  templateUrl: './workout-user-dialog-view.component.html',
  styleUrl: './workout-user-dialog-view.component.css'
})
export class WorkoutUserDialogViewComponent {

  @Input() dialogDisplay: boolean = false;
  @Input() userWorkoutData: User | null = null;

}
