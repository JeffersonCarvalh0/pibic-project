// import { Server, createServer } from 'https';
import { createServer, Server } from 'http'
// import fs from 'fs';

import { App, app } from './app'

/** This class represents the Http server where the express app will run. */
class MyServer {
  public instance: Server
  public app: App
  public running: boolean

  /** Here the server will be bootstraped */
  constructor(appInstance: App) {
    this.app = appInstance
    this.running = false

    // this.instance = createServer({
    //     key: fs.readFileSync('localhost.key'),
    //     cert: fs.readFileSync('localhost.cert')
    // }, this.app.app);
    this.instance = createServer(this.app.instance)
  }

  /** Starts the server */
  public async start() {
    if (this.running) {
      console.log('The server is already started and running at port 3000.')
    } else {
      this.instance = createServer(this.app.instance)
      await this.app.start()
      this.instance.listen(process.env.PORT || 3000)
      console.log(`Started server at port ${process.env.PORT || 3000}.`)
      this.running = true
    }
  }

  /** Closes the server's connections and shut it down */
  public async shutdown() {
    await this.app.shutdown()
    await this.instance.close()
    this.running = false
    console.log('Server is now offline.')
  }
}

// Runs the server
export const server = new MyServer(app)
process.env.NODE_ENV === 'test' ? async () => server.start() : server.start()
