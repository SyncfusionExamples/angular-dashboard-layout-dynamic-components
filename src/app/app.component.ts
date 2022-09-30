import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DragAndDropEventArgs, NodeClickEventArgs, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { closest } from '@syncfusion/ej2-base';
import { AnalytesDragAndDrop } from './analytes-drag-and-drop';
import {
  Inject,
  ViewChildren,
  ViewContainerRef,
  QueryList,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import {
  DashboardLayoutComponent,
  PanelModel,
} from '@syncfusion/ej2-angular-layouts';
import { Dialog } from '@syncfusion/ej2-popups';
import { Chart, LineSeries, Category } from '@syncfusion/ej2-charts';
import { Button } from '@syncfusion/ej2-buttons';
import { ChartComponent } from './chart.component';
import { BarComponent } from './bar.component';
import { GridComponent } from './grid.component';
Chart.Inject(LineSeries, Category);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {

  @ViewChild('default_dashboard')
  public dashboard: DashboardLayoutComponent;
  componentRef: ComponentRef<ChartComponent>;
  componentRefOne: ComponentRef<BarComponent>;
  componentRefTwo: ComponentRef<GridComponent>;
  // @ViewChild('template', { read: ViewContainerRef })
  // viewTemplate: ViewContainerRef;
  @ViewChildren('template', { read: ViewContainerRef })
  viewTemplate: QueryList<ViewContainerRef>;
  constructor(private cfr: ComponentFactoryResolver) {}
  public count: number = 8;
  public dialogObj: Dialog;
  public target: any;
  public cellSpacing: number[] = [10, 10];
  public data: Object[] = [
    { month: 'Jan', sales: 35 },
    { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 },
    { month: 'Apr', sales: 32 },
    { month: 'May', sales: 40 },
    { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 35 },
    { month: 'Aug', sales: 55 },
    { month: 'Sep', sales: 38 },
    { month: 'Oct', sales: 30 },
    { month: 'Nov', sales: 25 },
    { month: 'Dec', sales: 32 },
  ];
  public axis: Object = {
    valueType: 'Category',
  };

  public panelsData: any = [
    {
      index: 0,
      id: 'one',
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
    },
    {
      index: 1,
      id: 'two',
      sizeX: 3,
      sizeY: 1,
      row: 0,
      col: 1,
    },

    {
      index: 2,
      id: 'three',
      sizeX: 2,
      sizeY: 1,
      row: 1,
      col: 0,
    },
  ];
  addPanel(): void {
    let panel: PanelModel[] = [
      {
        id: this.count.toString(),
        sizeX: 1,
        sizeY: 1,
        row: 0,
        col: 0,
        content:
          '<span id="close" class="e-template-icon e-close-icon"></span><div class="text-align">' +
          this.count.toString() +
          '</div>',
      },
    ];
    this.dashboard.addPanel(panel[0]);
    let closeIcon: any = document
      .getElementById(this.count.toString())
      .querySelector('.e-close-icon');
    closeIcon.addEventListener('click', this.onCloseIconHandler.bind(this));
    this.count = this.count + 1;
  }
  onCloseIconHandler(event: any): void {
    if ((<HTMLElement>event.target).offsetParent) {
      this.dashboard.removePanel((<HTMLElement>event.target).offsetParent.id);
    }
  }
  addWidget(event) {
    this.target = event.target.closest('.e-panel').querySelector('.text-align');
    if (this.dialogObj == undefined) {
      this.dialogObj = new Dialog({
        width: '500px',
        header: 'Add a widget',
        showCloseIcon: true,
        animationSettings: { effect: 'Zoom' },
        content: document.getElementById('dialogcontent'),
        target: document.getElementById('target'),
        isModal: true,
        height: '260px',
        visible: false,
      });
      this.dialogObj.appendTo('#modalDialog');
    }
    this.dialogObj.show();
    document.getElementById('linetemplate').onclick = () => {
      this.dialogObj.hide();
      //Get the panel index.
      var count = this.target.id;
      this.viewTemplate.map((vcr: ViewContainerRef, index: number) => {
        //Check whether the panel index matches reference index.
        if (index == count && this.target.innerText == '') {
          const componentFactory =
            this.cfr.resolveComponentFactory(ChartComponent);
          this.componentRef = vcr.createComponent(componentFactory);
          this.componentRef.instance.chartData = this.data;
          this.componentRef.instance.primaryXAxis = this.axis;
        }
      });
    };
    document.getElementById('bartemplate').onclick = () => {
      this.dialogObj.hide();
      var count = this.target.id;
      this.viewTemplate.map((vcr: ViewContainerRef, index: number) => {
        if (index == count && this.target.innerText == '') {
          const componentFactory =
            this.cfr.resolveComponentFactory(BarComponent);
          this.componentRefOne = vcr.createComponent(componentFactory);
          this.componentRefOne.instance.data = [
            { x: 'Egg', y: 2.2 },
            { x: 'Fish', y: 2.4 },
            { x: 'Misc', y: 3 },
            { x: 'Tea', y: 3.1 },
          ];
          this.componentRefOne.instance.data1 = [
            { x: 'Egg', y: 1.2 },
            { x: 'Fish', y: 1.3 },
            { x: 'Misc', y: 1.5 },
            { x: 'Tea', y: 2.2 },
          ];
        }
      });
    };
    document.getElementById('gridtemplate').onclick = () => {
      this.dialogObj.hide();
      var count = this.target.id;
      this.viewTemplate.map((vcr: ViewContainerRef, index: number) => {
        if (index == count && this.target.innerText == '') {
          const componentFactory =
            this.cfr.resolveComponentFactory(GridComponent);
          this.componentRefTwo = vcr.createComponent(componentFactory);
          this.componentRefTwo.instance.gridData = [
            {
              OrderID: 10248,
              CustomerID: 'VINET',
              EmployeeID: 5,
              OrderDate: new Date(8364186e5),
              ShipName: 'Vins et alcools Chevalier',
              ShipCity: 'Reims',
              ShipAddress: '59 rue de l Abbaye',
              ShipRegion: 'CJ',
              ShipPostalCode: '51100',
              ShipCountry: 'France',
              Freight: 32.38,
              Verified: !0,
            },
            {
              OrderID: 10249,
              CustomerID: 'TOMSP',
              EmployeeID: 6,
              OrderDate: new Date(836505e6),
              ShipName: 'Toms Spezialitäten',
              ShipCity: 'Münster',
              ShipAddress: 'Luisenstr. 48',
              ShipRegion: 'CJ',
              ShipPostalCode: '44087',
              ShipCountry: 'Germany',
              Freight: 11.61,
              Verified: !1,
            },
            {
              OrderID: 10250,
              CustomerID: 'HANAR',
              EmployeeID: 4,
              OrderDate: new Date(8367642e5),
              ShipName: 'Hanari Carnes',
              ShipCity: 'Rio de Janeiro',
              ShipAddress: 'Rua do Paço, 67',
              ShipRegion: 'RJ',
              ShipPostalCode: '05454-876',
              ShipCountry: 'Brazil',
              Freight: 65.83,
              Verified: !0,
            },
          ];
        }
      });
    };
  }

}
