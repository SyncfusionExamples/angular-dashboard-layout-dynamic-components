import {
  Component,
  ViewEncapsulation,
  Input,
  Inject,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'grid-root',
  template: `<ejs-grid [dataSource]='gridData'>
  <e-columns>
      <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
      <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
      <e-column field='OrderDate' headerText='Order Date' textAlign='Right' format='yMd' width=120></e-column>
  </e-columns>
  </ejs-grid>`,
  encapsulation: ViewEncapsulation.None,
})
export class GridComponent {
  @Input() gridData: Object[];
  ngOnInit(): void {}
}
