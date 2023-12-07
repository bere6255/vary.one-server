import * as dotenv from "dotenv";
dotenv.config()
import Knex from 'knex'
import { Model } from 'objection'
import environments from './knexfile'; 
import routes from './routes/'
import app from "./app"
const port = process.env.PORT|| 8081;

// Initialize knex.
const knex = Knex(environments); // added prodcution incase of mispelling, wont mess up production DB

// Bind all Models to the knex instance. You only a
// need to do this once before you use any of
// your model classes.
Model.knex(knex);

app.use(routes)

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));