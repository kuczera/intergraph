import {CyElement} from "../../../../../helpers/CyElement";
import {GraphBuilder} from "../../GraphBuilder";
import {Position} from "../../../../../helpers/Position";

/**
 * Check if the found relation is a valid relation in our graph
 *
 * @param {CyElement} elementOne - one of ElementTwo's relations
 * @param {CyElement} elementTwo - the element to be added to the graph
 * @returns {boolean} - false if ElementTwo's related node is not in the graph yet
 */
export function isValidRelation(this: GraphBuilder, elementOne: CyElement, elementTwo: CyElement):boolean{
       return (
        this.cy.getElementById(elementOne.data.source!).length !== 0 || elementOne.data.source === elementTwo.data.id
        ) && (
        this.cy.getElementById(elementOne.data.target!).length !== 0 || elementOne.data.target === elementTwo.data.id
    );
}

/**
 * Gets the source position the element which ElementTwo relates to
 * @param {CyElement} elementOne - relationship
 * @param {CyElement} elementTwo - the element to be added to the graph
 * @returns {Position}
 */
export function getSourcePosition(this: GraphBuilder, elementOne: CyElement, elementTwo: CyElement):Position{
    if(elementOne.data.source === elementTwo.data.id){
        return this.cy.getElementById(elementOne.data.target).position();
    } else {

        return this.cy.getElementById(elementOne.data.source).position();
    }
}