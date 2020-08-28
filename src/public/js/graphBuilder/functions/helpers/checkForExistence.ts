import {GraphBuilder} from "../../GraphBuilder";
import {CyElement} from "../../../../../helpers/CyElement";

/**
 * Check if the element already exists in the Graph
 *
 *
 * @param {CyElement} element
 * @returns {boolean}
 */
export function elementExists(this: GraphBuilder, element: CyElement):boolean{

    return this.cy.getElementById(element.data.id).length !== 0;

}

