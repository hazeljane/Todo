import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddEntryComponent } from '../add-entry/add-entry.component';
import { DiaryService } from '../services/diary.service';
import { DiaryEntry } from '../model/diary.model';

@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddEntryComponent],
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit {
  latestEntry: DiaryEntry | null = null;
  historyEntries: DiaryEntry[] = [];  
  showAll = false;
  selectedEntries: Set<number> = new Set<number>();
  allEntries: DiaryEntry[] = [];  

  constructor(private diaryService: DiaryService) {}

  ngOnInit() {
    this.loadEntries();
  }

  onEntryAdded() {
    this.loadEntries();
  }

  deleteEntry(id: number) {
    const entryToDelete = this.allEntries.find(entry => entry.id === id);
    if (entryToDelete) {
      this.historyEntries.push(entryToDelete); 
      this.allEntries = this.allEntries.filter(entry => entry.id !== id); 
      this.saveEntries();
    }
  }

  toggleSelectEntry(entryId: number) {
    if (this.selectedEntries.has(entryId)) {
      this.selectedEntries.delete(entryId);
    } else {
      this.selectedEntries.add(entryId);
    }
  }

  selectAllEntries() {
    this.selectedEntries.clear();
    this.allEntries.forEach(entry => this.selectedEntries.add(entry.id));
  }
  toggleSelectAllEntries() {
    if (this.selectedEntries.size === this.allEntries.length) {
     this.selectedEntries.clear(); // unselect all
    } else {
      this.selectedEntries.clear();
      this.allEntries.forEach(entry => this.selectedEntries.add(entry.id)); // select all
    }
  }

  deleteSelectedEntries() {
    this.allEntries = this.allEntries.filter(entry => {
      const isSelected = this.selectedEntries.has(entry.id);
      if (isSelected) {
        this.historyEntries.push(entry);
      }
      return !isSelected;
    });
    this.selectedEntries.clear(); 
    this.saveEntries(); 
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  loadEntries() {
    this.allEntries = this.diaryService.getAllEntries();
    this.latestEntry = this.allEntries[this.allEntries.length - 1] ?? null;
  }

  saveEntries() {
    this.diaryService.saveEntries(this.allEntries);
  }

  refreshHistory() {
    this.historyEntries = [...this.historyEntries];
  }

  clearHistory() {
    this.historyEntries = [];
  }
}
