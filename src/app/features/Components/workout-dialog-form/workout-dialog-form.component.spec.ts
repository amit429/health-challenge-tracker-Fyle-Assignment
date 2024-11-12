import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDialogFormComponent } from './workout-dialog-form.component';

describe('WorkoutDialogFormComponent', () => {
  let component: WorkoutDialogFormComponent;
  let fixture: ComponentFixture<WorkoutDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDialogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
