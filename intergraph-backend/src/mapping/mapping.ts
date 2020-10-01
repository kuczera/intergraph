import Record from "neo4j-driver/types/record";
import {CyNode} from "./cytoscapeHelpers/CyNode";
import {CyEdge} from "./cytoscapeHelpers/CyEdge";

export function convertDatabaseRecordsToCyElements(records: Record[]): JSON[]{
    const cyElements: JSON[] = [];

    records.forEach((record) => {
        let dbElement;
        record.keys.forEach((key: string, index: number) => {
            dbElement = record.get(index);
            let cyElement: JSON = {} as JSON;

            switch(dbElement.constructor.name) {
                case "Node": {
                    cyElement = JSON.parse(JSON.stringify(new CyNode(dbElement)));
                    break;
                }
                case "Relationship": {
                    cyElement = JSON.parse(JSON.stringify(new CyEdge(dbElement)));
                    break;
                }
                default: {
                    console.warn("Unknown dbElement appeared");
                    return cyElements;
                }
            }
            cyElements.push(cyElement);
        });
    });
    return cyElements;
}