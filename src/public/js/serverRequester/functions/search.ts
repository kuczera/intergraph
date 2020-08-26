import axios from "axios";
import {ServerRequester} from "../ServerRequester";


export async function searchElements(this: ServerRequester, searchValue: string):Promise<string>{
    let elements = "";
    await axios.get(`http://${this.hostname}:${this.port}/searchnodes`, {
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