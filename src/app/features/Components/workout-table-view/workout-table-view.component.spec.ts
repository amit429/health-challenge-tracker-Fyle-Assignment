import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTableViewComponent } from './workout-table-view.component';
import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { TableData } from '../../../core/models/user.model';

describe('WorkoutTableViewComponent', () => {
  let component: WorkoutTableViewComponent;
  let fixture: ComponentFixture<WorkoutTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTableViewComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update tableText when tableData changes', () => {
    const tableData: TableData[] = [
      { name: 'John', workouts: 'Cardio, Strength', numberOfWorkouts: 2, totalMinutes: 75 },
      { name: 'Jane', workouts: 'Cardio, Yoga', numberOfWorkouts: 2, totalMinutes: 80 }
    ];

    const changes: SimpleChanges = {
      tableData: new SimpleChange(null, tableData, false)
    };
    component.tableData = tableData;

    component.ngOnChanges(changes);

    expect(component.tableText).toBe('Click on the User Row to see details');
  });

  it('should emit selectedUser event', () => {
    jest.spyOn(component.selectedUser, 'emit');
    component.onRowSelect({
      name: 'test',
      workouts: 'test',
      numberOfWorkouts: 1,
      totalMinutes: 1
    } as TableData);
    expect(component.selectedUser.emit).toHaveBeenCalledWith({
      name: 'test',
      workouts: 'test',
      numberOfWorkouts: 1,
      totalMinutes: 1
    } as TableData);
  });
});
