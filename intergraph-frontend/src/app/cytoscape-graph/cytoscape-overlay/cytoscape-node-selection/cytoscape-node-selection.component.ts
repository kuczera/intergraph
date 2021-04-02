import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NodeDefinition} from 'cytoscape';
import {GraphBuilderService} from '../../services/graphbuilder/graph-builder.service';


@Component({
  selector: 'app-cytoscape-node-selection',
  templateUrl: './cytoscape-node-selection.component.html',
  styleUrls: ['./cytoscape-node-selection.component.css']
})
export class CytoscapeNodeSelectionComponent implements OnInit {

  @Input()
  nodeSelection: Array<NodeDefinition> = new Array<NodeDefinition>();

  @Output()
  nodesToPull: EventEmitter<any> = new EventEmitter<any>();


  constructor(private graphBuilderService: GraphBuilderService) { }


  ngOnInit(): void {
  }


  add(): void {
    this.nodeSelection.forEach((element, index) => {
      this.graphBuilderService.addNodeWithRelations(element);
    });
    this.nodeSelection = new Array<NodeDefinition>();
    this.nodesToPull.emit(null);
  }


  clear(): void {
    this.nodeSelection = new Array<NodeDefinition>();
    this.nodesToPull.emit(null);
  }

}
