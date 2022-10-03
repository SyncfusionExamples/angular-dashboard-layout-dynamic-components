import { NgModule } from '@angular/core';
import { DropDownListModule, ComboBoxModule, ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeViewModule, TabModule, ToolbarModule, AccordionModule, ContextMenuModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MapsAllModule } from '@syncfusion/ej2-angular-maps';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  CategoryService,
  LegendService,
  TooltipService,
  DataLabelService,
  LineSeriesService,
  ChartAllModule,
  AccumulationChartAllModule,
  RangeNavigatorAllModule,
} from '@syncfusion/ej2-angular-charts';
import {
  TextBoxModule,
  NumericTextBoxModule,
} from '@syncfusion/ej2-angular-inputs';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import {
  PageService,
  SortService,
  FilterService,
  GroupService,
  GridModule,
} from '@syncfusion/ej2-angular-grids';

import {
  CheckBoxModule,
  ButtonAllModule,
} from '@syncfusion/ej2-angular-buttons';

import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart.component';
import { BarComponent } from './bar.component';
import { GridComponent } from './grid.component';

@NgModule({
  declarations: [
    AppComponent,ChartComponent, BarComponent, GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ListBoxModule, TreeViewModule,
    NumericTextBoxModule,
    MapsAllModule,
    AutoCompleteModule,
    DashboardLayoutModule,
    CheckBoxModule,
    SidebarModule,
    ButtonAllModule,
    TextBoxModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    GridModule,
  ],
  // exports: [ListBoxModule, TreeViewModule],
  providers: [    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,],
    entryComponents: [ChartComponent, BarComponent, GridComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
