import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartType, ChartDataSets, ChartOptions} from 'chart.js';
import {Label, Color, BaseChartDirective} from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-cytoscape-config',
  templateUrl: './cytoscape-config.component.html',
  styleUrls: ['./cytoscape-config.component.css']
})
export class CytoscapeConfigComponent implements OnInit {

  dataPoints: Array<any> = [{ x: 1, y: 10}, { x: 2, y: 20}];

  @ViewChild('lineChart') private chartRef;
  chart: any;


  constructor() { }

  ngOnInit(): void {

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.dataPoints,
            borderColor: '#00AEFF',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

}
