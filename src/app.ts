import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config';

// Routes
import { CatsRoutes } from './routes/cat';

/**  This class represents the express app itself. */
export class App {
    app: express.Application; // The app itself
    router: express.Router; // The router object for modular routes

    constructor() {
        // Start the app
        this.app = express();

        // Start middlewares
        this.middlewares();

        // Start and set up the database
        this.db()

        // Start and setup the router
        this.router = express.Router();
        this.routes();
    }

    /** Add the routes to the router */
    public routes() {
        // Set the app to use the custom router
        this.app.use(this.router);

        // Append cats routes
        CatsRoutes.create(this.router);
    }

    private db() {
        mongoose.connect(config.DBHost)
            .then(() => console.log(`Successfuly connected with mongodb at host ${config.DBHost}`))
            .catch((err: Error) => console.log(`The following error has ocurred: ${err}`));
    }

    public middlewares() {
        // Parse json requests
        this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    /** Closes all opened connections */
    public shutdown() {
        mongoose.connection.close();
    }
}

export const app: App = new App();
