import {GraphBuilder} from "./graphBuilder/GraphBuilder";
import {RequestService} from "./requestService/RequestService";
import {generateCyElementMultiDictionary} from "./menu/generateCyElementMultiDictionary";
import {generateListFromMultiDictionary} from "./menu/generateListFromMultiDictionary";

export const graphContainer = document.getElementById("cy");


const graphBuilder = GraphBuilder.getInstance();
const serverRequester = RequestService.getInstance();

export const listGenerated = document.createEvent('Event');
listGenerated.initEvent("ListGenerated", true, true);

const foundnodes = document.getElementById("foundNodes");
const search = document.getElementById("searchNodes");
const searchElement = document.getElementById("search") as HTMLInputElement;

searchElement.addEventListener("focus", () => {
    const icon = document.getElementById("icon");
    icon!.style.display = "none";
});
searchElement.addEventListener("blur", () => {
    const icon = document.getElementById("icon");

    if(searchElement.value === ""){
        icon!.style.display = "block";
    }
});


search!.addEventListener("submit", async (event) => {
    event.preventDefault();
    searchElement!.blur();

    // graphBuilder.addByUrlWithRelations(searchElement.value);

    foundnodes!.innerHTML = "";
    const loader = document.createElement("div");
    loader.classList.add("loader");
    foundnodes!.appendChild(loader);


    await serverRequester.searchElements(searchElement.value)
        .then((response) => {
            const myMultiDict = generateCyElementMultiDictionary(response);
            foundnodes!.innerHTML = "";
            foundnodes!.appendChild(
                generateListFromMultiDictionary(graphBuilder, myMultiDict)
            );
            document.dispatchEvent(listGenerated);
        })
        .catch((error) => {
            console.log(error)
            foundnodes!.innerHTML = "Something went wrong! Check the console for more Information!";
        });
});




document.addEventListener("DOMContentLoaded", () => {

    let elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {});

    const options = {};
    elems = document.querySelectorAll('.tabs');
    M.Tabs.init(elems, options);
});

document.addEventListener("ListGenerated", () => {
    console.log("event called");
    const elems = document.querySelectorAll('.collapsible');
    const options = {};
    M.Collapsible.init(elems, options);
});






