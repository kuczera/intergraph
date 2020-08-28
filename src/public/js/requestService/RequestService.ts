import {searchElements, searchRegesta} from "./functions/search";
import {getNode, getRelatedNodesByElement, getRelatedNodesById, getRelations} from "./functions/get";

/**
 * Service for sending axios requests to the backend API
 */
class RequestService{
    private static instance: RequestService;

    protected requestURL:string;

    /**
     * sets the URL for the backend calls with using the environment variables
     */
    private constructor() {
        this.requestURL = `http://${process.env.HOST_NAME}:${process.env.SERVER_PORT}/`;
    }

    public static getInstance(): RequestService{
        if(!RequestService.instance){
            RequestService.instance = new RequestService();
        }

        return RequestService.instance;
    }

    /**
     * functions to nodes from the backend
     * @type {(searchValue: string) => Promise<string>}
     */
    public searchElements = searchElements;
    public getNode = getNode;
    public getRelatedNodesById = getRelatedNodesById
    public getRelatedNodesByElement = getRelatedNodesByElement;
    public searchRegesta = searchRegesta;

    /**
     * functions to get edges from the backend
     */
    public getRelations = getRelations;
}

export {RequestService};