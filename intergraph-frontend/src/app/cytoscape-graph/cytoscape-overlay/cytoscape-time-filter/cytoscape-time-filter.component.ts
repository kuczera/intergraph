import { Component, OnInit } from '@angular/core';
import { ElementDataService } from '../../../services/ElementData/element-data.service';
import { NouiFormatter } from 'ng2-nouislider';
import { GraphBuilderService } from '../../services/graphbuilder/graph-builder.service';

@Component({
  selector: 'app-cytoscape-time-filter',
  templateUrl: './cytoscape-time-filter.component.html',
  styleUrls: ['./cytoscape-time-filter.component.css']
})



export class CytoscapeTimeFilterComponent implements OnInit {

  toolTips: boolean[] = [true, true];
  start = 0;
  end = 15;
  someRange: number[] = [this.start, this.end];
  format: NouiFormatter = {from: this.toNumber, to: this.toFormat};
  step: number = 6 * 4 * 7 * 24 * 60 * 60 * 1000;

  constructor(
    private elementDataService: ElementDataService,
    private graphBuilderService: GraphBuilderService
  ) { }



  ngOnInit(): void {
    this.elementDataService.getAllDates()
      .subscribe((data) => {
        let startDate = new Date(data[0].date);
        let endDate = new Date(data[0].date);

        for (const entry of data) {
          const date = new Date(entry.date);

          if (date.getTime() < startDate.getTime()) {
            startDate = date;
          }

          if (date.getTime() > endDate.getTime() && date.getTime() !== 0) {
            endDate = date;
          }
        }
        this.start = startDate.getTime();
        this.end = endDate.getTime();

      });
  }


  // convert timestamp to string format
  toFormat(value: number): string {
    const d = new Date();
    d.setTime(value);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }



  // convert date string to timestamp
  toNumber(value: string): number {
    const val = value.split(' ');

    if (val.length < 2) {
      return new Date().getTime();
    }
    return new Date(value).getTime();
  }



  timestamp(str: string): number {
    return new Date(str).getTime();
  }



  onChange(event: any): void {
    this.graphBuilderService.filterGraph(event[0], event[1]);
  }

}
