import express from 'express';
import {AddressInfo} from 'net';
import * as routes from './routes';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();


// Allow CORS
app.use(cors());

// Configre Routes
routes.register(app);

// init body-parser
app.use(express.json());

// start server
const server = app.listen(8080, () => {
    console.log(`Listening on http://localhost:${(server.address() as AddressInfo).port}`);
});
