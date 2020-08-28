import {GraphBuilder} from "../GraphBuilder";
import {generateCyElementMultiDictionary} from "../../menu/generateCyElementMultiDictionary";
import {generateListFromMultiDictionary} from "../../menu/generateListFromMultiDictionary";
import {listGenerated} from "../../main";


/**
 * Exposes various information about the node in the node information content
 */
export function onNodeTap(this: GraphBuilder) {
    this.cy.on('tap', 'node', (evt:any)  => {


        const nodeInformation = document.getElementById("nodeInformationContent");
        nodeInformation!.innerHTML = "";
        for (const key of Object.keys(evt.target.data())){
            const value = evt.target.data()[key];
            nodeInformation!.innerHTML +=
                `<p><b>${key}:</b> ${value}</p>`

        }

        const nodesRelationContent = document.getElementById("nodeRelationContent");
        this.serverRequester.getRelatedNodesById(evt.target.data().id)
            .then((response) => {
                const myMultiDict = generateCyElementMultiDictionary(response);

                nodesRelationContent!.innerHTML = "";
                nodesRelationContent!.appendChild(
                    generateListFromMultiDictionary(this, myMultiDict)
                );
                document.dispatchEvent(listGenerated);


            })
            .catch((error) => {
                console.log(error);
                nodesRelationContent!.innerHTML = "Something went wrong! Check the console for more Information!";
            });
    });
}

/**
 * Logs the edges information to the console
 */
export function onEdgeTap(this: GraphBuilder){
    this.cy.on('tap', 'edge', (evt:any) => {
        console.log(evt.target.data());
    })
}

