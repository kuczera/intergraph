import neo4j from "neo4j-driver";

/**
 * Constant for creating the database sessions
 *
 * @type {Driver}
 */

export const db = neo4j.driver(
    "bolt://jlu-buster.mni.thm.de:12321",
    neo4j.auth.basic("neo4j", "1234")
);