import {GraphBuilder} from "../GraphBuilder";
import {CyElement} from "../../../../helpers/CyElement";
import {Position} from "../../../../helpers/Position";

/**
 * Add a node by their ID
 * @param {string} nodeid
 * @returns {Promise<void>}
 */
export async function addNodeById(this: GraphBuilder, nodeid:string){

    let node;
    await this.serverRequester.getNode(nodeid)
        .then((response) => {
            node = JSON.parse(response);
            this.cy.add(node);

        })
        .catch((error) => {
            console.log(error);
        });

}

/**
 * Adds an element (Node) to the graph and checks for existing relations in the current graph
 * if relations exists, it adds the edges too
 * if no relations are there the new position is generated randomly
 * if on relation is there the new position is randomly around the related node
 * if there are more than 1 related nodes the new node is positioned in the center
 * @param {CyElement} element
 * @returns {Promise<void>}
 */
export async function addByElement(this: GraphBuilder, element: CyElement){

    if(!this.elementExists(element)){
        const foundRelations:CyElement[] = [];
        const sourcePositions:Position[] = [];
        let x = 0;
        let y = 0;

        await this.serverRequester.getRelations(element)
            .then((response) => {
                const elements = JSON.parse(response);
                elements.forEach((responseElement:CyElement) => {
                    if(this.isValidRelation(responseElement, element)){
                        sourcePositions.push(this.getSourcePosition(responseElement, element));
                        foundRelations.push(responseElement);
                    }
                });
            });


        const a = Math.random() * 2 * Math.PI;

        if(foundRelations.length === 0){
            x = 500 + 300 * Math.cos(a);
            y = 500 + 300 * Math.sin(a);
        } else if (foundRelations.length === 1){
            x = sourcePositions[0].x + 200 * Math.cos(a);
            y = sourcePositions[0].y + 200 * Math.sin(a);
        } else {
            sourcePositions.forEach((position) => {
                x = x + position.x;
                y = y + position.y;
            });
            x = x / sourcePositions.length;
            y = y / sourcePositions.length;
        }

        element.position = new Position(x, y);

        this.cy.add(element);
        foundRelations.forEach((relation) => {
            this.cy.add(relation);
        });

        this.cy.layout({name: 'cola'}).run();

    }

}

/**
 * Adds a regesta and all their relations to the graph
 * @param {string} uri - the uri as used in the properties and on regesta-imperii
 */
export function addRegestaByURIWithRelations(this: GraphBuilder, uri: string){
    this.serverRequester.searchRegesta(uri)
        .then((response) => {
            const elements = JSON.parse(response);
            if(elements.length === 1){
                elements.forEach((element:CyElement) => {
                    this.cy.add(element);
                    this.serverRequester.getRelatedNodesByElement(element)
                        .then((childResponse) => {
                            const childElements = JSON.parse(childResponse);
                            childElements.forEach((childElement:CyElement) => {
                                this.addByElement(childElement).catch((error) => {console.log(error)});
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            } else {
                console.log("No unique identifier used");
            }

        })
        .catch((error) => {
            console.log(error);
        });

}
