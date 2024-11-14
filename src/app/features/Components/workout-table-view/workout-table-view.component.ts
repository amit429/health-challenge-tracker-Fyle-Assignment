import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableData } from '../../../core/models/user.model';
import {TableModule} from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-workout-table-view',
  standalone: true,
  imports: [TableModule, PaginatorModule],
  templateUrl: './workout-table-view.component.html',
  styleUrl: './workout-table-view.component.css'
})
export class WorkoutTableViewComponent implements OnChanges {

  @Input() tableData: TableData[] = [];
  @Output() selectedUser = new EventEmitter<TableData>();

  totalRecords: number = 0;
  rowsPerPage: number = 5;
  currentPage: number = 0;
  tableText : string = "No records found";

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      this.totalRecords = this.tableData.length;
      if (this.tableData.length > 0) {
        this.tableText = 'Click on the User Row to see details';
      }
    }
  }

  onRowSelect(event: TableData) {
    this.selectedUser.emit(event);
  }
}
