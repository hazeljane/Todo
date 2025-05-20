import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';   // <-- import here
import { CommonModule } from '@angular/common'; // <-- import here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// other imports...

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // other components...
  ],
  imports: [
    BrowserModule,
    FormsModule,    // <-- add here
    CommonModule,   // <-- add here if needed (BrowserModule includes it, so usually not needed here)
    HttpClientModule,
    // other modules...
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
