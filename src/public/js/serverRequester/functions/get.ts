import axios from "axios";
import {ServerRequester} from "../ServerRequester";
import {CyElement} from "../../../../helpers/CyElement";

export async function getNode(this: ServerRequester, nodeid:string):Promise<string> {
    let elements = "";
    await axios.get(`http://${this.hostname}:${this.port}/getnode`, {
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

export async function getRelatedNodesById(this: ServerRequester, nodeid: string):Promise<string>{
    let elements = "";
    await axios.get(`http://${this.hostname}:${this.port}/getrelatednodes`, {
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

export async function getRelatedNodesByElement(this: ServerRequester, element: CyElement):Promise<string>{
    let elements = "";
    await axios.get(`http://${this.hostname}:${this.port}/getrelatednodes`, {
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

export async function getRelations(this: ServerRequester, element: CyElement):Promise<string>{
    let elements = "";
    await axios.get(`http://${this.hostname}:${this.port}/getrelations`, {
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

