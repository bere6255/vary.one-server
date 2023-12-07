import express, { Express, Router } from 'express';
import bodyParser from 'body-parser'
import routes from './routes/'
import cors from "cors"
express.json({ limit: 2000, type: 'application/json' })
const app: Express = express();
// parse application/json
app.use(cors())
app.use(bodyParser.json())
// Initialize knex.

app.use(routes)



export default app;