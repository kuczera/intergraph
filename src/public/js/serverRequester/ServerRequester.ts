import {searchElements} from "./functions/search";
import {getNode, getRelatedNodesByElement, getRelatedNodesById, getRelations} from "./functions/get";

class ServerRequester{
    private static instance: ServerRequester;

    protected hostname?:string;
    protected port?:string;

    private constructor() {
        if(process.env.HOST !== undefined){
            this.hostname = process.env.HOST;
        }
        if(process.env.PORT !== undefined){
            this.port = process.env.PORT;
        }
    }

    public static getInstance(): ServerRequester{
        if(!ServerRequester.instance){
            ServerRequester.instance = new ServerRequester();
        }

        return ServerRequester.instance;
    }

    public searchElements = searchElements;
    public getNode = getNode;
    public getRelatedNodesById = getRelatedNodesById
    public getRelatedNodesByElement = getRelatedNodesByElement;
    public getRelations = getRelations;
}

export {ServerRequester};