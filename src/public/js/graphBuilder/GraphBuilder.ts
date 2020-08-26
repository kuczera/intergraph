import {addByElement, addNodeById} from "./functions/add";
import {initiateGraph} from "./functions/initiateGraph";
import {ServerRequester} from "../serverRequester/ServerRequester";
import {onNodeTap} from "./functions/onNodeTap";
import {elementExists} from "./functions/helpers/checkForExistence";
import {getSourcePosition, isValidRelation} from "./functions/helpers/checkForRelations";

class GraphBuilder{
    private static instance: GraphBuilder;
    protected serverRequester: ServerRequester;
    protected cy: any;

    private constructor(){
        this.serverRequester = ServerRequester.getInstance();
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
}

export {GraphBuilder};