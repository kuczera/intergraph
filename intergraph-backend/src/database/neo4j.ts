import neo4j, {Driver, QueryResult} from "neo4j-driver";
import * as dotenv from "dotenv";


dotenv.config();


// Create Driver
const driver: Driver = neo4j.driver(
    process.env.DBHOST, neo4j.auth.basic(process.env.DBUSER, process.env.DBPW), { disableLosslessIntegers: true });



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
