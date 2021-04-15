import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {GraphBuilderService} from '../services/graphbuilder/graph-builder.service';
import {ElementDataService} from '../../services/ElementData/element-data.service';
import {EdgeDefinition, ElementDefinition, NodeDefinition} from 'cytoscape';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-cytoscape-context-menu',
  templateUrl: './cytoscape-context-menu.component.html',
  styleUrls: ['./cytoscape-context-menu.component.css']
})
export class CytoscapeContextMenuComponent implements OnInit {
  @HostBinding('style.left') x = '0px';
  @HostBinding('style.top') y = '0px';
  @HostBinding('style.visibility') visibility = 'hidden';

  @ViewChild('container') container: ElementRef;
  @ViewChild('nodeMenu') nodeMenu: ElementRef;
  @ViewChild('canvasMenu') canvasMenu: ElementRef;

  isNodeMenuShowed = false;
  isCanvasMenuShowed = false;
  node: NodeDefinition = {data: {}};

  relationsByType: Map<string, number> = new Map<string, number>();

  constructor(private graphBuilderService: GraphBuilderService,
              private elementDataService: ElementDataService,
              public app: AppComponent) { }

  ngOnInit(): void {
  }

  show(x: number, y: number): void {
    this.relationsByType = new Map<string, number>();
    this.x = `${x + 10}px`;
    this.y = `${y + 10}px`;
    this.visibility = 'visible';
  }

  hide(): void {
    this.x = '0px';
    this.y = '0px';
    this.visibility = 'hidden';
    this.isNodeMenuShowed = false;
    this.isCanvasMenuShowed = false;
  }

  getNodeRelations(): void {
    this.elementDataService.getRelations(this.node.data.id)
      .subscribe((result: EdgeDefinition[]) => {
        result.forEach((edge: EdgeDefinition) => {
          if (this.relationsByType.get(edge.data.type) === undefined) {
            this.relationsByType.set(edge.data.type, 1);
          } else {
            this.relationsByType.set(
              edge.data.type, this.relationsByType.get(edge.data.type) + 1
            );
          }
        });
      });
  }

  showNodeMenu(evt: any): void {
    this.node = this.graphBuilderService.getElement(evt.target.id());
    this.isNodeMenuShowed = true;
    this.isCanvasMenuShowed = false;
    this.show(evt.originalEvent.pageX, evt.originalEvent.pageY);

    this.getNodeRelations();
  }

  showCanvasMenu(evt: any): void {
    this.isCanvasMenuShowed = true;
    this.isNodeMenuShowed = false;
    this.show(evt.originalEvent.pageX, evt.originalEvent.pageY);
  }

  seeInfo(): void {
    this.graphBuilderService.createNodeInformation(this.graphBuilderService.getElement(this.node.data.id));
    this.hide();
  }

  redirectToWebSite(): void {
    window.open(this.node.data.url);
  }

  expandAll(): void {
    for (const key of this.relationsByType.keys()) {
      this.expandByRelationType(key);
    }
    this.hide();
  }

  expandByRelationType(type: string): void {
    this.elementDataService.getRelatedNodesByType(this.node.data.id, type).subscribe((definitions: ElementDefinition[]) =>
      definitions.forEach(definition => this.graphBuilderService.addElement(definition))
    );
    this.hide();
  }

  collapseAll(): void {
    for (const key of this.relationsByType.keys()) {
      this.collapseByRelationType(key);
    }
    this.hide();
  }

  collapseByRelationType(type: string): void {
    this.elementDataService.getRelatedNodesByType(this.node.data.id, type).subscribe((definitions: ElementDefinition[]) =>
      definitions.forEach(definition => this.graphBuilderService.removeElement(definition))
    );
    this.hide();
  }

  collapseNode(): void {
    this.graphBuilderService.removeElement(this.node);
    this.hide();
  }

  cleanCanvas(): void {
    /*this.graphBuilderService.cyGraph.elements().remove();*/
    this.graphBuilderService.removeAll();
    this.hide();
  }

  fitCanvas(): void {
    this.graphBuilderService.cyGraph.fit();
    this.hide();
  }

  //
  // Map
  //

  allToMap(): void {
    this.app.openMap(this.graphBuilderService.getElements());
  }

  visibleToMap(): void {
    this.app.openMap(this.graphBuilderService.getVisibleElements());
  }

  selectionToMap(): void {
    this.app.openMap(this.graphBuilderService.getSelectedElements());
  }

  //
  // CSV export
  //

  exportAllToCSV(): void {
    this.graphBuilderService.exportElementsToCSV(this.graphBuilderService.getElements());
    this.hide();
  }

  exportVisibleToCSV(): void {
    this.graphBuilderService.exportElementsToCSV(this.graphBuilderService.getVisibleElements());
    this.hide();
  }

  exportSelectionToCSV(): void {
    this.graphBuilderService.exportElementsToCSV(this.graphBuilderService.getSelectedElements());
    this.hide();
  }

  //
  // Other
  //

  openURL(): void {
    window.open(this.node.data.url, '_blank');
  }
}
