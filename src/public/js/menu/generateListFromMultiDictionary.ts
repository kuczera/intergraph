import * as Collections from 'typescript-collections';
import {GraphBuilder} from "../graphBuilder/GraphBuilder";

export function generateListFromMultiDictionary(graphBuilder: GraphBuilder,
                                                multiDictionary: Collections.MultiDictionary<any, any>,
                                                sourceElementId: string | null):HTMLElement{

    const parentList = document.createElement("ul");
    parentList.classList.add("collapsible");
    parentList.setAttribute("data-collapsible", "expandable");


    multiDictionary.keys().forEach((key) => {
        const foundCyElements = multiDictionary.getValue(key);

        const parentListElement = document.createElement("li");

        const parentHeader = document.createElement("div");
        parentHeader.classList.add("collapsible-header");
        parentHeader.innerHTML = `${key} (${foundCyElements.length})`;

        const parentBody = document.createElement("div");
        parentBody.classList.add("collapsible-body");

        const childList = document.createElement("ul");
        childList.classList.add("collapsible");
        childList.setAttribute("data-collapsible", "expandable");

        foundCyElements.forEach((cyElement) => {
            const childListElement = document.createElement("li");

            const childHeader = document.createElement("div");
            childHeader.classList.add("collapsible-header");
            childHeader.innerHTML = cyElement.data.displayToken;

            const childBody = document.createElement("div");
            childBody.classList.add("collapsible-body");

            const childBodyText = document.createTextNode(JSON.stringify(cyElement.data));

            const childBodyAddToGraphButton = document.createElement("button");
            childBodyAddToGraphButton.innerHTML = "add";
            childBodyAddToGraphButton.addEventListener("click", () => {
                graphBuilder.addByElement(cyElement, sourceElementId);
            });

            childBody.appendChild(childBodyText);
            childBody.appendChild(childBodyAddToGraphButton);

            childListElement.appendChild(childHeader);
            childListElement.appendChild(childBody);

            childList.appendChild(childListElement);
        });

        parentBody.appendChild(childList);

        parentListElement.appendChild(parentHeader);
        parentListElement.appendChild(parentBody);

        parentList.appendChild(parentListElement);

    });


    return parentList;
}