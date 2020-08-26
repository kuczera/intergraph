import {CyElementData} from "./CyElementData";
import {Position} from "./Position";

/**
 * Used to create the JSON objects which are required in the frontend
 */
export class CyElement{
    group: string;
    data:CyElementData = null;
    position = {} as Position;
    scratch?: string[];
    classes?: string;
    selected?: boolean;
    selectable?: boolean;
    locked?: boolean;
    grabbable?: boolean;
    pannable?: boolean;


    /**
     * Is called for any element and provides basic information which belong to either nodes or edges
     *
     * @param responseElement - the element/record as it was returned from the database
     */
    constructor(responseElement:any){
        if(responseElement.constructor.name === "Node"){
            this.group = "nodes";

            // default cytoscape setting
            this.selected = false;
            this.selectable = true;
            this.locked = false;
            this.grabbable = true;
            this.pannable = false;

        } else if (responseElement.constructor.name === "Relationship") {
            this.group = "edges";
        } else {
            console.warn("Unexpected Element: " + responseElement.constructor.name)
        }

        /**
         * The elements data is placed here with basic information which are not set in the records properties
         * @type {CyElementData}
         */
        this.data = new CyElementData(responseElement);

        /**
         * All data which is saved in the properties of the records have to be placed in the data of the returning
         * element
         */
        const properties = JSON.parse(JSON.stringify(responseElement.properties));
        for (const key of Object.keys(properties)){

            this.data[key] = properties[key];
        }


    }


}



