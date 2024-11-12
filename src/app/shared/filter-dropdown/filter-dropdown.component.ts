import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './filter-dropdown.component.html',
  styleUrl: './filter-dropdown.component.css'
})
export class FilterDropdownComponent implements OnInit {
  
  workoutTypes = [
    { label: 'All', value: null },
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Yoga', value: 'Yoga' },
  ];

  selectedWorkoutType: any = null;

  @Output() filterChange = new EventEmitter<any>();

  onFilterChange() {
    this.filterChange.emit(this.selectedWorkoutType);
  }
  
  
  ngOnInit(): void {
    this.filterChange.emit(this.selectedWorkoutType);
  }
}
