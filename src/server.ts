import { Server, createServer } from 'http';

import { App, app } from './app';

/** This class represents the Http server where the express app will run. */
class MyServer {
    public instance: Server;
    public app: App;

    /** Here the server will be bootstraped */
    constructor(app: App) {
        this.app = app;
        this.instance = createServer(this.app.app);
        this.instance.listen(3000);
        console.log("Started server at port 3000.");
    }

    /** Closes the server's connections and shut it down */
    public shutdown() {
        this.app.shutdown();
        this.instance.close();
    }
}

// Runs the server
export const server = new MyServer(app);
