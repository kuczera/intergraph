import axios from "axios";
import {RequestService} from "../RequestService";
import {CyElement} from "../../../../helpers/CyElement";

export async function getNode(this: RequestService, nodeid:string):Promise<string> {
    let elements = "";
    await axios.get(this.requestURL + `getnode`, {
        params: {
            id: nodeid
        }
    })
        .then((response) => {
            elements = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    return elements;

}

export async function getRelatedNodesById(this: RequestService, nodeid: string):Promise<string>{
    let elements = "";
    await axios.get(this.requestURL + `getrelatednodes`, {
        params: {
            id: nodeid
        }
    })
        .then((response)=>{
            elements = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    return elements;
}

export async function getRelatedNodesByElement(this: RequestService, element: CyElement):Promise<string>{
    let elements = "";
    await axios.get(this.requestURL + `getrelatednodes`, {
        params: {
            id: element.data.id
        }
    })
        .then((response)=>{
            elements = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    return elements;
}

export async function getRelations(this: RequestService, element: CyElement):Promise<string>{
    let elements = "";
    await axios.get(this.requestURL + `getrelations`, {
        params: {
            id: element.data.id
        }
    })
        .then((response)=>{
            elements = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    return elements;
}

