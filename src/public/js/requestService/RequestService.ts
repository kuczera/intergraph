import {searchElements} from "./functions/search";
import {getNode, getRelatedNodesByElement, getRelatedNodesById, getRelations} from "./functions/get";

class RequestService{
    private static instance: RequestService;

    protected requestURL:string;

    private constructor() {
        this.requestURL = `http://${process.env.HOST_NAME}:${process.env.SERVER_PORT}/`;
        console.log(this.requestURL);
    }

    public static getInstance(): RequestService{
        if(!RequestService.instance){
            RequestService.instance = new RequestService();
        }

        return RequestService.instance;
    }

    public searchElements = searchElements;
    public getNode = getNode;
    public getRelatedNodesById = getRelatedNodesById
    public getRelatedNodesByElement = getRelatedNodesByElement;
    public getRelations = getRelations;
}

export {RequestService};