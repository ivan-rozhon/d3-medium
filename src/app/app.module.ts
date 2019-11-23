import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SelectionComponent } from './selection/selection.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { AxisComponent } from './axis/axis.component';

@NgModule({
  declarations: [AppComponent, PieChartComponent, BarChartComponent, SelectionComponent, DataBindingComponent, DataVisualizationComponent, AxisComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
