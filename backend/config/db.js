/**
 * Database functions
 * @author Jesus Moreira
 */

const { Sequelize } = require("sequelize");
const server = require("./server");
const bookModel = require("../models/Book.model");

// DB config
const sequelize = new Sequelize({
  dialect: "mssql",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  define: {
    freezeTableName: true,
  },
});

/**
 * Establishes a connection to the sql server database
 */
const connect = async () => {
  try {
    console.log("Connecting to the database...\n");

    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully!\n"
    );

    syncModels();
  } catch (err) {
    console.error(`Unable to connect to the database: ${err}`);
  }
};

/**
 * Syncs all of the models to the database
 * and launches the server on the corresponding port
 */
const syncModels = async () => {
  try {
    console.log("Synchronizing the models...\n");
    sequelize.define("TMAELIBROBIBLIO", bookModel, { timestamps: false });

    await sequelize.sync();
    console.log("Done!\n");

    server.initialize();
  } catch (err) {
    console.error(`Unable to sync the models: ${err}`);
  }
};

module.exports = { connect, sequelize };
