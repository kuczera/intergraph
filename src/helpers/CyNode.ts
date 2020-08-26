import {CyElement} from "./CyElement";

/**
 * Used for nodes
 */
export class CyNode extends CyElement {

    /**
     * Sets the class and the token which shall be displayed of the element
     *
     * @param responseElement
     */
    constructor(responseElement:any){
        super(responseElement);

        /**
         * Specified for the used database
         *
         * Some of the entries have a "main"-class going along with the class "IndexEntry"
         * In case there is a "main"-class the "IndexEntry"-class is deleted from the element
         */
        responseElement.labels.join("").replace("IndexEntry", "") === ""
            ? this.classes = responseElement.labels.join("")
            : this.classes = responseElement.labels.join("").replace("IndexEntry", "");


        /**
         * Used for setting the token which shall be displayed in the graph.
         *
         * Since the token is different for each class, it needs to be specified for each.
         *
         * The following variable shall be put into a config file later on to make it more dynamic to be used
         * with other databases
         */
        const token : {[index:string] : string}  = {
            "Action": responseElement.properties.action,
            "ExternalResource": responseElement.properties.title,
            "IndexEntry": responseElement.properties.label,
            "IndexEvent": responseElement.properties.label,
            "IndexPerson": responseElement.properties.label,
            "IndexPlace": responseElement.properties.label,
            "IndexThing": responseElement.properties.path,
            "Literature": responseElement.properties.title,
            "Place": responseElement.properties.normalizedGerman,
            "Reference": responseElement.properties.title,
            "Regesta": responseElement.properties.identifier
        };

        this.data.displayToken = token[this.classes];

    }

}