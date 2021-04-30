import {Component, OnInit, Input} from '@angular/core';
import { ElementDataService } from '../../../services/ElementData/element-data.service';
import { NouiFormatter } from 'ng2-nouislider';
import { GraphBuilderService } from '../../services/graphbuilder/graph-builder.service';

@Component({
  selector: 'app-cytoscape-time-filter',
  templateUrl: './cytoscape-time-filter.component.html',
  styleUrls: ['./cytoscape-time-filter.component.css']
})



export class CytoscapeTimeFilterComponent implements OnInit {

  config = {  behaviour: 'drag', connect: [false, true, false],
    format:
    //  {to: function (value) { return value + ',-';},from: function (value) { return Number(value.replace(',-', ''));}}}
    {to: this.toFormat, from: this.toNumber } };
  toolTips: boolean[] = [true, true];
  min = 0;
  max = 10;
  @Input() someRange: number[] = [2,9];
  someotherRange: number[] = [2,9];
  format: NouiFormatter = {from: this.toNumber, to: this.toFormat};
  step: number = 1; //24 * 60 * 60 * 1000;

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
        this.min = startDate.getTime();
        this.max = endDate.getTime();
        this.someRange = [this.min,this.max];
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
      // sometimes at initialization, the formatting machanism send original number (??) so keep the number.
      return parseInt(val[0]);
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
