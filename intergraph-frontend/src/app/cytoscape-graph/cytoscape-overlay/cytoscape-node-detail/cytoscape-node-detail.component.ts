import {AfterViewInit, Component, Input} from '@angular/core';
import {nodeConfig} from '../../../intergraph/nodeConfig';
import {NodeDefinition} from 'cytoscape';

@Component({
  selector: 'app-cytoscape-node-detail',
  templateUrl: './cytoscape-node-detail.component.html',
  styleUrls: ['./cytoscape-node-detail.component.css']
})
export class CytoscapeNodeDetailComponent implements AfterViewInit {



  @Input()
  node: NodeDefinition;
  displayToken: string;

  constructor(
  ) { }

  ngAfterViewInit(): void {
    // this timeout handles the ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      // with this config the node name is set
      for (const key in nodeConfig) {
        if (key === this.node.classes) {
          const value = nodeConfig[key];
          this.displayToken = this.node.data[value];
        }
      }
    });

  }



}
