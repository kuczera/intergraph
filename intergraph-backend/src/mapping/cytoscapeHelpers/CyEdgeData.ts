import {EdgeDataDefinition} from 'cytoscape';

export class CyEdgeData implements EdgeDataDefinition {
  id?: string;
  source: string;
  target: string;

  constructor(dbElement: any) {
    // adding 'edge-' in front of the int since neo4j does
    // distinguish between nodes and edges when generating the ids
    // this may result in multiple occurrences of the same id
    this.id = 'edge-' + dbElement.identity;
    this.source = dbElement.start;
    this.target = dbElement.end;
  }

}
