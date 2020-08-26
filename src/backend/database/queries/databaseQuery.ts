import {db} from "../databaseConnector";
import Record from "neo4j-driver/types/record";


/**
 * Queries the database for a single entry with the given id
 *
 * @param {number} id - database id of the entry
 * @returns {Promise<Record[]>} - the returned record contains the entry
 */
export async function getNode(id: number):Promise<Record[]> {
    const dbsession = db.session();
    const query = await dbsession
        .run(`MATCH (n)
                    WHERE id(n) = ${id}
                    RETURN n`);

    return query.records;
}

/**
 * Queries the database for all relations of a single node
 *
 * @param {number} id - database id of the node where the relations are searched for
 * @returns {Promise<Record[]>} -  the returned records contain the given node and all its related nodes together with
 *      their relation. The single records contain the keys as NODE - RELATION - RELATED NODE
 */
export async function getNodesRelationsships(id: number):Promise<Record[]> {
    const dbsession = db.session();
    const query = await dbsession
        .run(`MATCH (n)-[r]-(x)
                    WHERE id(n) = ${id}
                    RETURN r`);

    return query.records;
}

/**
 * Queries the database for all related nodes of a single node
 *
 * @param {number} id - database id of the node where the relations are searched for
 * @returns {Promise<Record[]>} -  the returned records contains all related nodes
 */
export async function getRelatedNodes(id: number): Promise<Record[]> {
    const dbsession = db.session();
    const query = await dbsession
        .run(`MATCH (n)-[r]-(x)
                    WHERE id(n) = ${id}
                    RETURN x`);
    return query.records;
}


/**
 * Queries the database to get all nodes containing the given search text in one of their properties
 *
 * @param {string} searchText - the text to look for in the properties
 * @returns {Promise<Record[]>} - all entries which contain the text are returned as records
 */
export async function searchNodes(searchText: string):Promise<Record[]> {
    const dbsession = db.session();
    const query = await dbsession
        .run(`MATCH (n)
                    WHERE (
                        ANY(
                            prop IN KEYS(n)
                            WHERE n[prop]
                            CONTAINS "${searchText}"
                            )
                        ) 
                    RETURN n`);

    return query.records;
}


