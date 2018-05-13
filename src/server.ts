import { Server, createServer } from 'http';

import { App, app } from './app';

/** This class represents the Http server where the express app will run. */
class MyServer {
    public server: Server;
    public app: App;

    /** Here the server will be bootstraped */
    constructor(app: App) {
        this.app = app;
        this.server = createServer(this.app.app);
        this.server.listen(3000);
        console.log("Started server at port 3000.");
    }

    /** Closes the server's connections and shut it down */
    public shutdown() {
        this.app.db.close();
        this.server.close();
    }
}

export const server = new MyServer(app); // Runs the server
