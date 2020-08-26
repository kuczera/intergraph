import {addByElement, addByUrlWithRelations, addNodeById} from "./functions/add";
import {initiateGraph} from "./functions/initiateGraph";
import {RequestService} from "../requestService/RequestService";
import {onNodeTap} from "./functions/onNodeTap";
import {elementExists} from "./functions/helpers/checkForExistence";
import {getSourcePosition, isValidRelation} from "./functions/helpers/checkForRelations";
import cytoscape from "cytoscape";

// tslint:disable-next-line
const cola = require("cytoscape-cola");


class GraphBuilder{
    private static instance: GraphBuilder;
    protected serverRequester: RequestService;
    protected cy: any;

    private constructor(){
        this.serverRequester = RequestService.getInstance();
        cytoscape.use(cola);
        this.initiateGraph();
        this.onNodeTap();

    }

    public static getInstance(): GraphBuilder{
        if(!GraphBuilder.instance) {
            GraphBuilder.instance = new GraphBuilder();
        }

        return GraphBuilder.instance;
    }

    public addNodeById = addNodeById;
    public addByElement = addByElement;
    public elementExists = elementExists;
    public initiateGraph = initiateGraph;
    public onNodeTap = onNodeTap;
    public isValidRelation = isValidRelation;
    public getSourcePosition = getSourcePosition;
    public addByUrlWithRelations = addByUrlWithRelations;
}

export {GraphBuilder};