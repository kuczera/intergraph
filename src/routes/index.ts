import * as express from "express";
import {
    getNodesRelationsships,
    getNode,
    searchNodes,
    getRelatedNodes
} from "../backend/database/queries/databaseQuery";
import {getElementsFromAPIResponse} from "../backend/elementMapping/elementMapper";
import {GraphBuilder} from "../public/js/graphBuilder/GraphBuilder";


export const register = ( app: express.Application ) => {



    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {

        if(req.query.regesta !== undefined && req.query.regesta !== null){
            res.render( "index" , { regesta: req.query.regesta})
        } else {
            res.render( "index");
        }
    } );
    app.get("/getnode", async (req:any, res) => {
        getNode(req.query.id).then((result) => {
            res.json(getElementsFromAPIResponse(result));
        });
    });
    app.get("/getrelations", async (req:any, res) => {
       getNodesRelationsships(req.query.id).then((result) => {
           res.json(getElementsFromAPIResponse(result));
       });
    });
    app.get("/getrelatednodes", async (req:any, res) => {
        getRelatedNodes(req.query.id).then((result) => {
            res.json(getElementsFromAPIResponse(result));
        });
    });
    app.get("/searchnodes", async (req:any, res) => {
        searchNodes(req.query.searchText).then((result) => {
            res.json(getElementsFromAPIResponse(result));
        })
    });

};

