import {searchElements} from "./functions/search";
import {getNode, getRelatedNodesByElement, getRelatedNodesById, getRelations} from "./functions/get";

class ServerRequester{
    private static instance: ServerRequester;

    protected hostname?:string;
    protected port?:string;

    private constructor() {

        console.log(process.env.HOST);
        if(process.env.HOST !== undefined){
            this.hostname = process.env.HOST;
            console.log(this.hostname);
        }
        if(process.env.SERVER_PORT !== undefined){
            this.port = process.env.SERVER_PORT;
        }

        console.log(this.hostname);
        console.log(this.port);
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