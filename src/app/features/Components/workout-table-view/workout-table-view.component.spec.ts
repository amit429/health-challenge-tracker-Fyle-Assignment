import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTableViewComponent } from './workout-table-view.component';

describe('WorkoutTableViewComponent', () => {
  let component: WorkoutTableViewComponent;
  let fixture: ComponentFixture<WorkoutTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTableViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
