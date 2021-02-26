import {CyNodeData} from './CyNodeData';
import {ElementGroup, NodeDataDefinition, NodeDefinition, Position, Scratchpad} from 'cytoscape';


export class CyNode implements NodeDefinition{
  group?: ElementGroup;
  data: NodeDataDefinition;
  scratch?: Scratchpad;
  position?: Position;
  renderedPosition?: Position;
  selected?: boolean;
  selectable?: boolean;
  locked?: boolean;
  grabbable?: boolean;
  classes?: string;

  constructor(dbElement: any) {
    this.group = 'nodes';
    this.data = new CyNodeData(dbElement);

    this.classes = dbElement.labels.join("")

    // save all the informations the db exposes to us
    const dbProperties = JSON.parse(JSON.stringify(dbElement.properties));
    for (const key of Object.keys(dbProperties)){
      this.data[key] = dbProperties[key];
    }
  }

}
