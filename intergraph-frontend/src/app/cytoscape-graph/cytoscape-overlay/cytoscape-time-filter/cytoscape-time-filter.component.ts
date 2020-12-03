import { Component, OnInit } from '@angular/core';
import {ElementDataService} from '../../../services/ElementData/element-data.service';
import {start} from "repl";

@Component({
  selector: 'app-cytoscape-time-filter',
  templateUrl: './cytoscape-time-filter.component.html',
  styleUrls: ['./cytoscape-time-filter.component.css']
})
export class CytoscapeTimeFilterComponent implements OnInit {

  someRange: number[] = [0, 1];
  toolTips: boolean[] = [true, true];


  constructor(
    private elementDataService: ElementDataService,
  ) { }

  ngOnInit(): void {
    this.elementDataService.getAllDates()
      .subscribe((data) => {
        let startDate = new Date(data[0].date);
        let endDate = data[0].date;

        for (const entry of data) {
          const date = new Date(entry.date);

          if (date.getTime() < startDate.getTime()) {
            startDate = date;

          }
        }
        console.log(startDate);
      });
  }

}
