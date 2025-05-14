import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DiaryEntry } from '../model/diary.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private entries: DiaryEntry[] = [];
  private nextId = 1;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const stored = localStorage.getItem('diaryEntries');
      if (stored) {
        this.entries = JSON.parse(stored);
        this.nextId = Math.max(0, ...this.entries.map(e => e.id)) + 1;
      }
    }
  }

  getAllEntries(): DiaryEntry[] {
    return this.entries;
  }

  addEntry(content: string): DiaryEntry {
    const now = new Date();
    const entry: DiaryEntry = {
      id: this.nextId++,
      date: now.toLocaleDateString(undefined, {
        year: '2-digit', month: '2-digit', day: 'numeric'
      }),
      time: now.toLocaleTimeString(),
      content
    };

    this.entries.push(entry);
    this.saveToStorage();
    return entry;
  }

  deleteEntry(id: number): void {
    this.entries = this.entries.filter(entry => entry.id !== id);
    this.saveToStorage();
  }

  setEntries(entries: DiaryEntry[]): void {
    this.entries = entries;
    this.nextId = Math.max(0, ...entries.map(e => e.id)) + 1;
    this.saveToStorage();
  }

  saveEntries(entries: DiaryEntry[]): void {
    if (this.isBrowser) {
      localStorage.setItem('diaryEntries', JSON.stringify(entries));
      this.entries = entries;
      this.nextId = Math.max(0, ...entries.map(e => e.id)) + 1;
    }
  }

  private saveToStorage() {
    if (this.isBrowser) {
      localStorage.setItem('diaryEntries', JSON.stringify(this.entries));
    }
  }
}
