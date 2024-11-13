import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTableViewComponent } from './workout-table-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
