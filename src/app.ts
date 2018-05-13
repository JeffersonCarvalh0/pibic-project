import mongoose from 'mongoose';
import express from 'express';

import config from './config';

// Routes
import { CatsRoutes } from './routes';

/**  This class represents the express app itself. */
export class App {
    app: express.Application; // The app itself
    router: express.Router; // The router object for modular routes
    db: mongoose.Connection;

    constructor() {
        // Start the app
        this.app = express();

        // Start and setup the router
        this.router = express.Router();
        this.routes();

        // Start and set up the database
        this.db = mongoose.createConnection(config.DBHost);
        this.configdb();
    }

    /** Add the routes to the router */
    public routes() {
        // Set the app to use the custom router
        this.app.use(this.router);

        // Append cats routes
        CatsRoutes.create(this.router);
    }

    public configdb() {
        this.db.once('open', () => console.log(`Successfully connected with mongodb at host ${config.DBHost}`));
    }
}

export const app = new App();
