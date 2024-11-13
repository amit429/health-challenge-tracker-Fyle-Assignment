import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableData } from '../../../core/models/user.model';
import { WorkoutService } from '../../../core/services/workout.service';
import {TableModule} from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-workout-table-view',
  standalone: true,
  imports: [TableModule, PaginatorModule],
  providers: [WorkoutService],
  templateUrl: './workout-table-view.component.html',
  styleUrl: './workout-table-view.component.css'
})
export class WorkoutTableViewComponent implements OnChanges {

  @Input() tableData: TableData[] = [];
  @Output() selectedUser = new EventEmitter<TableData>();

  totalRecords: number = 0;
  rowsPerPage: number = 5;
  currentPage: number = 0;

  constructor(private workoutService: WorkoutService ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      this.totalRecords = this.tableData.length;
    }
  }

  onRowSelect(event: TableData) {
    this.selectedUser.emit(event);
  }
}
