import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { DiaryService } from './diary.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddEntryComponent,
    DiaryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DiaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
