import * as Collections from 'typescript-collections';

/**
 * creates a multidictonary from the backend's response
 * @param {string} response
 * @returns {MultiDictionary<string, any>}
 */
export function generateCyElementMultiDictionary(response:string):Collections.MultiDictionary<string, any>{
    const cyElementMultiDictionary = new Collections.MultiDictionary<string, any>();
    const elements =  JSON.parse(response);

    if(elements.length !== 0){
        elements.forEach((element:any) => {
            cyElementMultiDictionary.setValue(element.classes, element);
        });

    }

    return cyElementMultiDictionary;
}