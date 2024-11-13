import { Component, Output, EventEmitter, OnInit,Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  formControl: FormControl = new FormControl('');

  @Output() searchSubmit = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter();

  @Input() set searchValue(value: string) {
    this.formControl.setValue(value);
  }
  @Input() placeholder: string = "Search for Users";
  
  onSearch() {
    this.searchSubmit.emit(this.formControl.value);
  }
  
  ngOnInit() {
    this.formControl.valueChanges.pipe(debounceTime(300)).subscribe((value:string) =>{});
  }
}
