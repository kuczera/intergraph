import {CyRelationship} from "../../helpers/CyRelationship";
import {CyNode} from "../../helpers/CyNode";
import Record from "neo4j-driver/types/record";

/**
 * This functions is used to transform the records from the database into a JSON object as it is needed for the
 * cytoscape framework in the frontend
 *
 * @param {Record[]} response - the records which were return by the database query
 * @returns {JSON[]} - JSON object as needed for cytoscape
 */
export function getElementsFromAPIResponse(response:Record[]):JSON[]{
    const elements:JSON[] = [];

    response.forEach((x) => {
        let responseElement;
        x.keys.forEach((k:string, index:number) => {
            responseElement = x.get(index);
            let cyElement:JSON = {} as JSON;
            /**
             * The needed JSON object is a little bit different for nodes and edges
             */
            switch(responseElement.constructor.name){
                case "Node": {
                    cyElement = JSON.parse(JSON.stringify(new CyNode(responseElement)));
                    break;
                }
                case "Relationship": {
                    cyElement = JSON.parse(JSON.stringify(new CyRelationship(responseElement)));
                    break;
                }
                default: {
                    console.warn("Unknown responseElement appeared!");
                    return elements;
                }
            }
            elements.push(cyElement);
        })


    });

    return elements;
}

