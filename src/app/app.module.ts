import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AssetsComponent } from './assets/assets.component';
import { HttpClientModule } from '@angular/common/http';
import { SnapshotComponent } from './snapshot/snapshot.component';

@NgModule({
  declarations: [AppComponent, AssetsComponent, SnapshotComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
