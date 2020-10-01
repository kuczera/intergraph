import {EdgeDataDefinition, EdgeDefinition, ElementGroup} from "cytoscape";
import {CyEdgeData} from "./CyEdgeData";

export class CyEdge implements EdgeDefinition{
    group?: ElementGroup;
    data: EdgeDataDefinition;

    constructor(dbElement: any) {
        this.group = 'edges';
        this.data = new CyEdgeData(dbElement);

        // save all the informations the db exposes to us
        const dbProperties = JSON.parse(JSON.stringify(dbElement.properties));
        for (const key of Object.keys(dbProperties)){
            this.data[key] = dbProperties[key];
        }

        // another information is saved outside the properties
        this.data.type = dbElement.type;
    }

}
