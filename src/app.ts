/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {itemsRouter} from './items/items.routing';
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();



/**
 * App Variable
 */

// memeriksa apakah port ada
if(!process.env.PORT) {
      process.exit(1);
}
const PORT : number = parseInt(process.env.PORT as string, 10) // jika ada ambil nilai port yang di konversi dari process.env yang formatnya string


const app = express();


/**
 * App Configuration 
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items",itemsRouter)
app.use(errorHandler);
app.use(notFoundHandler);



/**
 * Server Activation
 */

app.listen(PORT, ()=>{
      console.log(`listening on http://localhost:${PORT}`);
})

/**
 * Routing (item/items.routing.ts)
# get all items
GET /api/menu/items

# get a single item using an id parameter
GET /api/menu/items/:id

# create an item
POST /api/menu/items

# update an item using an id parameter
PUT /api/menu/items/:id

# remove an item using an id parameter
DELETE /api/menu/items/:id

 */