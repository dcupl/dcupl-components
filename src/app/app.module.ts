import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleTextComponent } from './components/simple-text/simple-text.component';
import { ComponentsOverviewComponent } from './pages/components-overview/components-overview.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';
import { SimpleFacetsComponent } from './components/simple-facets/simple-facets.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleTextComponent,
    ComponentsOverviewComponent,
    SimpleTableComponent,
    SimpleFacetsComponent,
    RangeSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
