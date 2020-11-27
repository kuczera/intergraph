import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GraphBuilderService} from './services/graphbuilder/graph-builder.service';
import {CytoscapeOverlayComponent} from './cytoscape-overlay/cytoscape-overlay.component';
import {CytoscapeContextMenuComponent} from './cytoscape-context-menu/cytoscape-context-menu.component';
// import {EdgeDefinition} from 'cytoscape';

@Component({
  selector: 'app-cytoscape-graph',
  templateUrl: './cytoscape-graph.component.html',
  styleUrls: ['./cytoscape-graph.component.css'],
  providers: [
    GraphBuilderService
  ]
})
export class CytoscapeGraphComponent implements AfterViewInit {

  @ViewChild('cy') graphContainer: ElementRef;
  @ViewChild(CytoscapeOverlayComponent) child: any;
  @ViewChild('contextMenu') ctxMenu: CytoscapeContextMenuComponent;
  contextMenuShown: boolean;

  constructor(
    private graphBuilderService: GraphBuilderService,
  ) {}

  ngAfterViewInit(): void {
    this.graphBuilderService.setGraphContainerElement(this.graphContainer.nativeElement);
    this.graphBuilderService.initGraph();
    this.graphBuilderService.cyGraph.on('click', _ => this.ctxMenu.hide());
    this.graphBuilderService.cyGraph.on('cxttapend', event => this.showContextMenu(event));
  }

  showContextMenu(event: any): void {
    if (event.target instanceof Array) {
      this.ctxMenu.showNodeMenu(event);
    } else {
      this.ctxMenu.showCanvasMenu(event);
    }


  }
}
