import {NodeDataDefinition} from 'cytoscape';

export class CyNodeData implements NodeDataDefinition {
  id: string;
  parent?: string;
  [key: string]: any;

  constructor(dbElement: any) {
    // adding 'node-' in front of the int since neo4j does
    // distinguish between nodes and edges when generating the ids
    // this may result in multiple occurrences of the same id
    this.id = dbElement.identity;
  }

}
