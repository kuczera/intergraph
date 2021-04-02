import * as express from "express";
import {Request, Response} from "express";
import {QueryResult} from "neo4j-driver";
import neo4j from "../database/neo4j";
import {convertDatabaseRecordsToCyElements, convertLabelsToJson, convertDatesToJson} from "../mapping/mapping";

var fs = require('fs');
const FILENAME = "settings.json";

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

    // put the settings
    // parameters:  -
    app.put('/settings', (req: Request, res: Response) => {
        console.log("Saving settings to " + FILENAME);
        console.log(req.body);
        res.json(req.body);
        fs.writeFileSync(FILENAME, JSON.stringify(req.body));
    });

    // get the settings
    // parameters:  -
    app.get('/settings', (req: Request, res: Response) => {
        try {
            if (fs.existsSync(FILENAME)) {
                console.log("Reading settings from " + FILENAME);
                let data = JSON.parse(fs.readFileSync(FILENAME));
                console.log(data);
                res.json(data);
            }
            else {
                console.log(FILENAME + " does not exist, sending back empty json {}");
                res.json({});
            }
        } catch (err) {
            console.error(err);
        }
    });


    // get all keys encoutered for a given node type
    // parameters:
    //  node type
    app.get('/getKeys', (req: Request, res: Response) => {
        neo4j.read( `MATCH (n: \`${req.query.type}\`)
            WITH DISTINCT apoc.coll.sort(keys(n)) as allkeys
            WITH REDUCE (result = [], k IN COLLECT(allkeys)| apoc.coll.union(result,k)) as reduction
            UNWIND reduction as r RETURN r`)
            .then((result: QueryResult) => {
                res.json(convertLabelsToJson(result.records))
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
        neo4j.read( `MATCH (n)-[r:\`${req.query.type}\`]-(x)
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
                                    WHERE toLower(toString(n[prop]))
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
        neo4j.read(`MATCH (n:\`${req.query.filter}\`) 
                          WHERE toLower(toString(n.${req.query.property})) 
                          CONTAINS "${req.query.searchText}" 
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

    // get all labels from the database with their count
    app.get('/getDatabaseLabelCount', (req: Request, res: Response) => {
        neo4j.read(`CALL apoc.meta.stats() YIELD labels RETURN labels`)
            .then((result: QueryResult) => {
                let r = result.records[0].get(0);
                let s : JSON[] = [];
                for (let property in r)
                    s.push(JSON.parse(JSON.stringify({"name": property, "count": r[property] })));
                console.log(s);
                res.json(s);
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    });


};

