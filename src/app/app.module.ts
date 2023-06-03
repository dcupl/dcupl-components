import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleTextComponent } from './components/simple-text/simple-text.component';
import { ComponentsOverviewComponent } from './pages/components-overview/components-overview.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleTextComponent,
    ComponentsOverviewComponent,
    SimpleTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
