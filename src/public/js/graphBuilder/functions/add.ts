import {GraphBuilder} from "../GraphBuilder";
import {CyElement} from "../../../../helpers/CyElement";
import {Position} from "../../../../helpers/Position";


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

export function addByIdWithRelations(this: GraphBuilder, url: string){
    this.serverRequester.searchElements(url)
        .then((response) => {
            const elements = JSON.parse(response);
            elements.forEach((element:CyElement) => {
                this.cy.add(element);
                this.serverRequester.getRelatedNodesByElement(element)
                    .then((childResponse) => {
                        const childElements = JSON.parse(childResponse);
                        childElements.forEach((childElement:CyElement) => {
                            this.addByElement(childElement);
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        })
        .catch((error) => {
            console.log(error);
        });

}
//
// export async function addWithRelations(this: GraphBuilder, nodeid:string){
//
//     let nodes;
//     await this.serverRequester.getRelatedNodesById(nodeid)
//         .then((response) => {
//             nodes = JSON.parse(response);
//             this.cy.add(JSON.parse(nodes));
//
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }