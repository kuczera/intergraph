import {CyElement} from "../../../../../helpers/CyElement";
import {GraphBuilder} from "../../GraphBuilder";
import {Position} from "../../../../../helpers/Position";

export function isValidRelation(this: GraphBuilder, elementOne: CyElement, elementTwo: CyElement):boolean{
    return (
        this.cy.getElementById(elementOne.data.source!).length !== 0 || elementOne.data.source === elementTwo.data.id
        ) && (
        this.cy.getElementById(elementOne.data.target!).length !== 0 || elementOne.data.target === elementTwo.data.id
    );
}

export function getSourcePosition(this: GraphBuilder, elementOne: CyElement, elementTwo: CyElement):Position{
    if(elementOne.data.source === elementTwo.data.id){
        return this.cy.getElementById(elementOne.data.target).position();
    } else {

        return this.cy.getElementById(elementOne.data.source).position();
    }
}