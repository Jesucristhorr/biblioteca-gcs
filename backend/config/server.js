/**
 * Server initialization file
 * @author Jesus Moreira
 */

const express = require("express");
const cors = require("cors");

const app = express();

/**
 * Starts the server, default on port 3000.
 * @param port Optional: Server initialization port
 */
const initialize = (port = 3000) => {
  const booksRouter = require("../routes/books");

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/books", booksRouter);

  // Listening to port
  app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
  });
};

module.exports = { initialize };
