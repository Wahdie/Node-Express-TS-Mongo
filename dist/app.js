"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Required External Modules
 */
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express")); //untuk
const cors_1 = __importDefault(require("cors")); // untuk 
const helmet_1 = __importDefault(require("helmet")); // untuk 
const contacts_routing_1 = require("./router/contacts.routing");
const error_middleware_1 = require("./middleware/error.middleware");
const not_found_middleware_1 = require("./middleware/not-found.middleware");
dotenv.config();
// koneksi database
const db_1 = __importDefault(require("./db/db"));
db_1.default.connection.once('open', () => {
    console.log('Koneksi MongoDB berhasil terbuka');
});
/**
 * App Variable
 */
// memeriksa apakah port ada
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10); // jika ada ambil nilai port yang di konversi dari process.env yang formatnya string
const app = (0, express_1.default)();
/**
 * App Configuration
 */
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/contacts", contacts_routing_1.itemsRouter);
app.use(error_middleware_1.errorHandler);
app.use(not_found_middleware_1.notFoundHandler);
/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
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
