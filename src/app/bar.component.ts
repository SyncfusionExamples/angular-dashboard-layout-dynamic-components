import {
  Component,
  ViewEncapsulation,
  Input,
  Inject,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'bar-root',
  template: `<ejs-chart
  style="display:block;"
  [chartArea]="chartArea"
  width="100%"
  height="100%"
  [primaryXAxis]="primaryXAxis"
  [primaryYAxis]="primaryYAxis"
  [title]="title"
  [tooltip]="tooltip"
>
  <e-series-collection>
    <e-series
      [dataSource]="data"
      type="Bar"
      xName="x"
      yName="y"
      name="Imports"
      [marker]="marker"
    >
    </e-series>
    <e-series
      [dataSource]="data1"
      type="Bar"
      xName="x"
      yName="y"
      name="Exports"
      [marker]="marker"
    >
    </e-series>
  </e-series-collection>
</ejs-chart>`,
  encapsulation: ViewEncapsulation.None,
})
export class BarComponent {
  public chartArea: Object = {
    border: {
      width: 0,
    },
  };
  //Initializing Chart Width
  @Input() data: Object[];
  @Input() data1: Object[];
  //Initializing Marker
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top',
      font: {
        fontWeight: '600',
        color: '#ffffff',
      },
    },
  };
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    title: 'Food',
    interval: 1,
    majorGridLines: { width: 0 },
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}B',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: {
      color: 'transparent',
    },
  };
  public tooltip: Object = {
    enable: true,
  };

  // custom code end
  public title: string = 'UK Trade in Food Groups - 2015';
  constructor() {
    //code
  }
}