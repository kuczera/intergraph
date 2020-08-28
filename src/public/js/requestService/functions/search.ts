import axios from "axios";
import {RequestService} from "../RequestService";


export async function searchElements(this: RequestService, searchValue: string):Promise<string>{
    let elements = "";
    await axios.get(this.requestURL + `searchnodes`, {
        params: {
            searchText: searchValue
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

export async function searchRegesta(this: RequestService, URI: string):Promise<string>{
    let elements = "";
    await axios.get(this.requestURL + `searchregesta`, {
        params: {
            searchURI: URI
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
