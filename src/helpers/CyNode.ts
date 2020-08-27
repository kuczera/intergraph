import {CyElement} from "./CyElement";
import labelconfig from "./labelconfig.json";
import fs from "fs";
import * as path from "path";

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
         * Sets the token that shall be displayed in the graph resolved by the given config
         */

        const config: {[index:string] : string} = labelconfig;
        for (const key in config) {
            if(key === this.classes) {
                const value = config[key];
                this.data.displayToken = responseElement.properties[value];
            }
        }

        // saving this method for later

        // const data = fs.readFileSync(path.join(__dirname, './labelconfig.json'), 'utf8');
        // const json = JSON.parse(data);
        // for(const key in json) {
        //     if(key === this.classes) {
        //         const value = json[key];
        //         this.data.displayToken = responseElement.properties[value];
        //     }
        // }





    }

}