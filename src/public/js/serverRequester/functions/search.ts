import axios from "axios";
import {ServerRequester} from "../ServerRequester";


const hostname = process.env.HOST;

export async function searchElements(this: ServerRequester, searchValue: string):Promise<string>{
    let elements = "";
    await axios.get(`http://${hostname}:8080/searchnodes`, {
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