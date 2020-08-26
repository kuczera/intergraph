export class CyElementData {
    [index: string]: any;
    id: string;
    displayToken?: string;
    label?: string;
    source?: string;
    target?: string;

    /**
     * Used to set the id of the responseElement when creating the JSON object from the database record
     *
     * @param responseElement - the responseElement/record as it was returned from the database
     */
    constructor(responseElement: any) {

        this.id = responseElement.identity.low;

    }

}