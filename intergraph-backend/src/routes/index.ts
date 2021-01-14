import * as express from "express";
import {Request, Response} from "express";
import {QueryResult} from "neo4j-driver";
import neo4j from "../database/neo4j";
import {convertDatabaseRecordsToCyElements, convertLabelsToJson, convertDatesToJson} from "../mapping/mapping";


export const register = ( app: express.Application ) => {

    // default route handler
    app.get('/', (req: Request, res: Response) => {
        res.send('API is online!');
    });

    // get a single node by their id
    // parameters:
    //  id
    app.get('/getNode', (req: Request, res: Response) => {
        neo4j.read( `MATCH (n)
                            WHERE id(n) = ${req.query.id}
                            RETURN n`)
            .then((result: QueryResult) => {
                res.json(convertDatabaseRecordsToCyElements(result.records))
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });

    // get all relations of a single node
    // parameters:
    //  id
    app.get('/getRelations', (req: Request, res: Response) => {
        neo4j.read( `MATCH (n)-[r]-(x)
                            WHERE id(n) = ${req.query.id}
                            RETURN r`)
            .then((result: QueryResult) => {
                res.json(convertDatabaseRecordsToCyElements(result.records));
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });

    // get all related nodes of a single node
    // parameters:
    //  id
    app.get('/getRelatedNodes', (req: Request, res: Response) => {
        neo4j.read( `MATCH (n)-[r]-(x)
                            WHERE id(n) = ${req.query.id}
                            RETURN x`)
            .then((result: QueryResult) => {
                res.json(convertDatabaseRecordsToCyElements(result.records));
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });

    // get all related nodes and their edges of a single node by their type
    // parameters:
    //  id
    //  type
    app.get('/getRelatedNodesByType', (req: Request, res: Response) => {
        neo4j.read( `MATCH (n)-[r:${req.query.type}]-(x)
                            WHERE id(n) = ${req.query.id}
                            RETURN x,r`)
            .then((result: QueryResult) => {
                res.json(convertDatabaseRecordsToCyElements(result.records));
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });

    // get all nodes with the given search text in one of their properties
    // parameters:
    //  searchText
    app.get('/searchNodes', (req: Request, res: Response) => {
        neo4j.read( `MATCH (n)
                            WHERE (
                                ANY (
                                    prop IN KEYS(n)
                                    WHERE Lower(toString(n[prop]))
                                    CONTAINS "${req.query.searchText}"
                                    )
                                )
                            RETURN n`)
            .then((result: QueryResult) => {
                res.json(convertDatabaseRecordsToCyElements(result.records));
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });



    // get all nodes with the given search text in one of their properties
    // parameters:
    //  searchText
    app.get('/searchNodesByType', (req: Request, res: Response) => {
        neo4j.read( `MATCH (n:${req.query.filter})
                            WHERE (
                                ANY (
                                    prop IN KEYS(n)
                                    WHERE n[prop]
                                    CONTAINS "${req.query.searchText}"
                                    )
                                )
                            RETURN n`)
            .then((result: QueryResult) => {
                res.json(convertDatabaseRecordsToCyElements(result.records));
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });



    // get all labels from the database
    app.get('/getDatabaseLabels', (req: Request, res: Response) => {
        neo4j.read(`CALL db.labels()`)
            .then((result: QueryResult) => {
                res.json(convertLabelsToJson(result.records));
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });
    
    
    app.get('/getAllDates', (req: Request, res: Response) => {
        neo4j.read('MATCH (n) RETURN DISTINCT n.startDate')
            .then((result: QueryResult) => {
                res.json(convertDatesToJson(result.records));
            })
            .catch((error) => {
               res.status(400);
               res.send(error);
            });
    });


};

