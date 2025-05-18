import { Routes } from '@angular/router';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { AddEntryComponent } from './add-entry/add-entry.component';

export const routes: Routes = [
  { path: '', redirectTo: 'diarylist', pathMatch: 'full' },
  { path: 'addentry', component: AddEntryComponent },
  { path: 'diarylist', component: DiaryListComponent }
];
