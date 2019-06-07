import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'
import { Config } from './config'
import { StudentRoutes } from './routes/student.route'

class App {
  public app: express.Application
  public usersRoute: StudentRoutes = new StudentRoutes()
  public config: Config = new Config()

  public constructor() {
    this.app = express()
    this.appConfig()
    this.usersRoute.routes(this.app)
    this.mongoSetup()
  }

  private appConfig(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private mongoSetup(): void {
    // mongoose.Promise = global.Promise
    mongoose.connect(this.config.MONGODB_URI, { useNewUrlParser: true })
  }
}

export default new App().app
