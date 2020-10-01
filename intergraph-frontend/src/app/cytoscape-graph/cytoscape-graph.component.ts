import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GraphBuilderService} from './services/graphbuilder/graph-builder.service';
import {CytoscapeOverlayComponent} from './cytoscape-overlay/cytoscape-overlay.component';

@Component({
  selector: 'app-cytoscape-graph',
  templateUrl: './cytoscape-graph.component.html',
  styleUrls: ['./cytoscape-graph.component.css'],
  providers: [
    GraphBuilderService
  ]
})
export class CytoscapeGraphComponent implements AfterViewInit {

  @ViewChild('cy')
  graphContainer: ElementRef;

  @ViewChild(CytoscapeOverlayComponent)
  child: any;

  constructor(
    private graphBuilderService: GraphBuilderService,
  ) { }

  ngAfterViewInit(): void{
    this.graphBuilderService.setGraphContainerElement(this.graphContainer.nativeElement);
    this.graphBuilderService.initGraph();

  }


}
