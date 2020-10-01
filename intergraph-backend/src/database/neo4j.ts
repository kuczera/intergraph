import neo4j, {Driver, QueryResult} from "neo4j-driver";

// Create Driver
const driver: Driver = neo4j.driver(
    'bolt://jlu-buster.mni.thm.de:10211', neo4j.auth.basic('neo4j', '1234')
);



export default {
    async read(cypher: string, params?: Record<string, any>, database?: string): Promise<QueryResult> {
        const session = driver.session({
            defaultAccessMode: neo4j.session.READ,
            database,
        });
        return await session.run(cypher, params)
            .then(res => {
                session.close();
                return res;
            });
    },
    async write(cypher: string, params?: Record<string, any>, database?: string): Promise<QueryResult> {
        const session = driver.session({
            defaultAccessMode: neo4j.session.WRITE ,
            database,
        });
        return await session.run(cypher, params)
            .then( res => {
                session.close();
                return res;
            });
    }
}
