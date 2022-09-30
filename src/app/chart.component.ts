import {
  Component,
  ViewEncapsulation,
  Input,
  Inject,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'chart-root',
  template: `<ejs-chart
  [primaryXAxis]="primaryXAxis"
  width="100%"
  height="100%"
>
  <e-series-collection>
    <e-series
      [dataSource]="chartData"
      type="Line"
      xName="month"
      yName="sales"
      name="Sales"
    ></e-series>
  </e-series-collection>
</ejs-chart>`,
  encapsulation: ViewEncapsulation.None,
})
export class ChartComponent {
  @Input() primaryXAxis: Object;
  @Input() chartData: Object[];
  ngOnInit(): void {
    // Data for chart series
  }
}
