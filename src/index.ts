import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as routes from "./routes";
import bodyParser from "body-parser";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
// export const hostname = process.env.HOST;
const port = process.env.SERVER_PORT;

const app = express();
/**
 * typedoc test
 */
// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// Configure Express to serve static files in the public folder
app.use( express.static( path.join( __dirname, "public" ) ) );

// Configure Express to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configure routes
routes.register( app );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );