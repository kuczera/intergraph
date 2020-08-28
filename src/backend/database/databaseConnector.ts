import neo4j from "neo4j-driver";
import dbconfig from "./dbconfig.json";

/**
 * Constant for creating the database sessions
 *
 * @type {Driver}
 */
export const db = neo4j.driver(
    dbconfig.dbhost,
    neo4j.auth.basic(dbconfig.dbusername, dbconfig.dbpassword)
);