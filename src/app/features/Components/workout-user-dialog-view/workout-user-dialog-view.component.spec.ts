import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutUserDialogViewComponent } from './workout-user-dialog-view.component';

describe('WorkoutUserDialogViewComponent', () => {
  let component: WorkoutUserDialogViewComponent;
  let fixture: ComponentFixture<WorkoutUserDialogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutUserDialogViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutUserDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
