import {GraphBuilder} from "./graphBuilder/GraphBuilder";
import {ServerRequester} from "./serverRequester/ServerRequester";
import {generateCyElementMultiDictionary} from "./menu/generateCyElementMultiDictionary";
import {generateListFromMultiDictionary} from "./menu/generateListFromMultiDictionary";

export const graphContainer = document.getElementById("cy");

const graphBuilder = GraphBuilder.getInstance();
const serverRequester = ServerRequester.getInstance();

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

    foundnodes!.innerHTML = "";
    const loader = document.createElement("div");
    loader.classList.add("loader");
    foundnodes!.appendChild(loader);


    await serverRequester.searchElements(searchElement.value)
        .then((response) => {
            const myMultiDict = generateCyElementMultiDictionary(response);
            foundnodes!.innerHTML = "";
            foundnodes!.appendChild(
                generateListFromMultiDictionary(graphBuilder, myMultiDict, null)
            );
            document.dispatchEvent(listGenerated);
        })
        .catch((error) => {
            console.log(error)
            foundnodes!.innerHTML = "Something went wrong! Check the console for more Information!";
        });
});


document.addEventListener("DOMContentLoaded", () => {
    const options = {};
    const elems = document.querySelectorAll('.tabs');
    M.Tabs.init(elems, options);
});

document.addEventListener("ListGenerated", () => {
    console.log("event called");
    const elems = document.querySelectorAll('.collapsible');
    const options = {};
    M.Collapsible.init(elems, options);
});






