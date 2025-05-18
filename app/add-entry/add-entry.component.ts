import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiaryService } from '../services/diary.service';

@Component({
  selector: 'app-add-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent {
  @Output() entryAdded = new EventEmitter<void>();
  content: string = '';

  constructor(private diaryService: DiaryService) {}

  addEntry() {
    if (this.content.trim()) {
      this.diaryService.addEntry(this.content);
      this.content = '';
      this.entryAdded.emit();
    }
  }
}
