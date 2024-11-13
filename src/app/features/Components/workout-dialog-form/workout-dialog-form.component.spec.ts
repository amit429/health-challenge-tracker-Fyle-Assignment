import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDialogFormComponent } from './workout-dialog-form.component';
import { MessageService } from 'primeng/api';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WorkoutDialogFormComponent', () => {
  let component: WorkoutDialogFormComponent;
  let fixture: ComponentFixture<WorkoutDialogFormComponent>;
  let messageService: jest.Mocked<MessageService>;

  beforeEach(async () => {
    const messageServiceSpy = {
      add: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [WorkoutDialogFormComponent],
      providers: [{
        provide: MessageService,
        useValue: messageServiceSpy,
      }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    messageService = TestBed.inject(MessageService) as jest.Mocked<MessageService>;
    fixture = TestBed.createComponent(WorkoutDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set displayDialog to true when showDialog is called', () => {
    component.showDialog();
    expect(component.displayDialog).toBe(true);
  });

  it('should emit workoutAdded and show success message when all fields are filled', () => {
    component.name = 'Morning Run';
    component.workoutType = { value: 'Running' };
    component.workoutMinutes = 30;
    jest.spyOn(component.workoutAdded, 'emit');
    jest.spyOn(component, 'hideDialog');

    component.addWorkout();
    expect(component.name).toBe('');
    expect(component.workoutType).toBeNull();
    expect(component.workoutMinutes).toBeNull();
    expect(component.hideDialog).toHaveBeenCalled();
  });

});
