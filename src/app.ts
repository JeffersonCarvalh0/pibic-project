import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'

import './auth'
import config from './config'

// Routes
import { ActivityRoutes } from './routes/activity.routes'
import { ContentRoutes } from './routes/content.routes'
import { LocationRoutes } from './routes/location.routes'
import { UserRoutes } from './routes/user.routes'

/**  This class represents the express app itself. */
export class App {
  instance: express.Application // The app itself
  router: express.Router // The router object for modular routes
  public running: boolean

  constructor() {
    // Start the app
    this.instance = express()

    // Start and setup the router
    this.router = express.Router()

    this.running = false
  }

  /** Starts the app */
  public async start() {
    if (this.running) {
      console.log('The app is already started.')
    } else {
      // Start middlewares
      this.middlewares()

      // Start and set up the database
      await this.db()

      // Setup the router
      this.routes()

      this.running = true
    }
  }

  /** Add the routes to the router */
  public routes() {
    // Set the app to use the custom router
    this.instance.use(this.router)

    // Append routes to the router
    LocationRoutes.create(this.router)
    ContentRoutes.create(this.router)
    ActivityRoutes.create(this.router)
    UserRoutes.create(this.router)
  }

  public middlewares() {
    this.instance.use(cors())

    // Parse json requests
    this.instance.use(bodyParser.json())

    // Configure morgan
    if (process.env.NODE_ENV !== 'test') {
      this.instance.use(
        morgan(config.LOGGER, {
          skip: (req: Request, res: Response) => res.statusCode < 400,
          stream: process.stderr,
        }),
      )

      this.instance.use(
        morgan(config.LOGGER, {
          skip: (req: Request, res: Response) => res.statusCode >= 400,
          stream: process.stdout,
        }),
      )
    }

    // Passport
    this.instance.use(passport.initialize())
  }

  /** Closes all opened connections */
  public async shutdown() {
    await mongoose.connection.close()
    this.running = false
  }

  private async db() {
    try {
      await mongoose.connect(config.DBHost, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })

      console.log(`Successfuly connected with mongodb at host ${config.DBHost}`)
    } catch (err) {
      console.log(`The following error has ocurred when trying to connect with the database: ${err}`)
    }
  }
}

export const app: App = new App()
