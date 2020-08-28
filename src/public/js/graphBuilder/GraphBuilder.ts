import {addByElement, addRegestaByURIWithRelations, addNodeById} from "./functions/add";
import {initiateGraph} from "./functions/initiateGraph";
import {RequestService} from "../requestService/RequestService";
import {onEdgeTap, onNodeTap} from "./functions/onNodeTap";
import {elementExists} from "./functions/helpers/checkForExistence";
import {getSourcePosition, isValidRelation} from "./functions/helpers/checkForRelations";
import cytoscape from "cytoscape";

// tslint:disable-next-line
const cola = require("cytoscape-cola");

/**
 * Class to manage all graph-functionality
 */
class GraphBuilder{
    private static instance: GraphBuilder;
    protected serverRequester: RequestService;
    protected cy: any;

    private constructor(){
        cytoscape.use(cola);
        this.serverRequester = RequestService.getInstance();
        this.initiateGraph();
        this.onNodeTap();
        this.onEdgeTap();

    }

    public static getInstance(): GraphBuilder{
        if(!GraphBuilder.instance) {
            GraphBuilder.instance = new GraphBuilder();
        }

        return GraphBuilder.instance;
    }

    /**
     * Functions for graph initialization
     */
    public initiateGraph = initiateGraph;
    public onNodeTap = onNodeTap;
    public onEdgeTap = onEdgeTap;

    /**
     * Functions for adding elements to the graph
     */
    public addNodeById = addNodeById;
    public addByElement = addByElement;
    public addRegestaByURIWithRelations = addRegestaByURIWithRelations;

    /**
     * Helper functions
     */
    public elementExists = elementExists;
    public isValidRelation = isValidRelation;
    public getSourcePosition = getSourcePosition;


}

export {GraphBuilder};