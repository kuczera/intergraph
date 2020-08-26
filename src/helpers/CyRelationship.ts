import {CyElement} from "./CyElement";

/**
 * Used for edges
 */
export class CyRelationship extends CyElement {

    /**
     * Sets the label, source and target of the edge
     * @param responseElement
     */
    constructor(responseElement:any){
        super(responseElement);

        if(responseElement.type !== undefined || responseElement.type !== null){
            this.data.label = responseElement.type;
            this.data.displayToken = responseElement.type;
        }
        if(responseElement.start !== undefined || responseElement.start !== null){
            this.data.source = responseElement.start.low;
        }
        if(responseElement.end !== undefined || responseElement.end !== null){
            this.data.target = responseElement.end.low;
        }




    }

}