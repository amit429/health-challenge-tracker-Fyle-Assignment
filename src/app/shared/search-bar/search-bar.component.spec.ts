import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchSubmit event', () => {
    jest.spyOn(component.searchSubmit, 'emit');
    component.formControl.setValue('test');
    component.onSearch();
    expect(component.searchSubmit.emit).toHaveBeenCalledWith('test');
  });

  it("should emit searchChange event with debounced value", () => {
    jest.useFakeTimers();
    jest.spyOn(component.searchChange, 'emit');
    component.formControl.setValue('test');
    component.formControl.setValue('test1');
    jest.advanceTimersByTime(300);
    expect(component.searchChange.emit).toHaveBeenCalledWith
  });
});
