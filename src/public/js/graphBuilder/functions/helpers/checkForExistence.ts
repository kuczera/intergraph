import {GraphBuilder} from "../../GraphBuilder";
import {CyElement} from "../../../../../helpers/CyElement";

export function elementExists(this: GraphBuilder, element: CyElement):boolean{
    if(this.cy.getElementById(element.data.id).length !== 0){
        console.log("element already exists");
        return true;
    } else {
        return false;
    }

}

