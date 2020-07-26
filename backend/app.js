/**
 * Main file
 * @author Jesus Moreira
 */

// Environment variables
require("dotenv").config();

const db = require("./config/db");

// Connects to the database and starts
// the server
db.connect();
